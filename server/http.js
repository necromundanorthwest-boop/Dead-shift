import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {Game} from './engine.js';
const base=fileURLToPath(new URL('../public/',import.meta.url));
const game=new Game();
const streams=new Map(), limits=new Map();
const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"};
const json=(res,status,obj)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store',...headers});res.end(JSON.stringify(obj));};
async function body(req){let b='';for await(const chunk of req){b+=chunk;if(b.length>4096)throw new Error('Request too large.');}try{return JSON.parse(b)}catch{throw new Error('Invalid JSON.');}}
export const server=http.createServer(async(req,res)=>{
 try{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/healthz')return json(res,200,{ok:true,version:'0.1.0'});
 if(url.pathname.startsWith('/api/')){
 const origin=req.headers.origin;
 if(origin&&new URL(origin).host!==req.headers.host)return json(res,403,{error:'Cross-origin requests are not allowed.'});
 if(req.headers['sec-fetch-site']==='cross-site')return json(res,403,{error:'Cross-site requests are not allowed.'});
 const ip=req.socket.remoteAddress;const now=Date.now();let rate=limits.get(ip);if(!rate||now-rate.at>10000){rate={at:now,n:0,create:0};limits.set(ip,rate);}if(++rate.n>1800)return json(res,429,{error:'Too many requests.'});
 if(req.method==='POST'&&['/api/create','/api/join'].includes(url.pathname)){
 if(++rate.create>30)return json(res,429,{error:'Too many room requests. Please wait.'});const data=await body(req);
 const {room,player}=url.pathname==='/api/create'?game.create(data.name,data.practice===true):game.join(String(data.code??'').toUpperCase(),data.name);
 return json(res,200,{code:room.code,token:player.token,state:game.view(room,player)});
 }
 const code=url.searchParams.get('room'),token=req.headers.authorization?.replace(/^Bearer /,'');const {room,player}=game.auth(code,token);
 if(req.method==='GET'&&url.pathname==='/api/stream'){
 game.touch(player);const existing=streams.get(player.token);existing?.res.end();res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no',...headers});res.write(`data: ${JSON.stringify(game.view(room,player))}\n\n`);const stream={res,room,player};streams.set(player.token,stream);req.on('close',()=>{if(streams.get(player.token)===stream){streams.delete(player.token);player.connected=false;player.lastSeen=Date.now();player.input={x:0,y:0};}});return;
 }
 if(req.method==='POST'&&url.pathname==='/api/ping'){game.touch(player);return json(res,200,{ok:true});}
 if(req.method==='POST'&&url.pathname==='/api/action'){game.action(room,player,await body(req));return json(res,200,{ok:true});}
 return json(res,404,{error:'Unknown endpoint.'});
 }
 if(req.method!=='GET'&&req.method!=='HEAD')return json(res,405,{error:'Method not allowed.'});
 const paths={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/style.css':'style.css','/world.js':'world.js','/favicon.svg':'favicon.svg'};const path=paths[url.pathname];if(!path)return json(res,404,{error:'Not found.'});const content=await readFile(base+path);const mime=path.endsWith('.js')?'text/javascript':path.endsWith('.css')?'text/css':path.endsWith('.svg')?'image/svg+xml':'text/html';res.writeHead(200,{'Content-Type':mime,'Cache-Control':'no-cache',...headers});res.end(req.method==='HEAD'?undefined:content);
 }catch(err){if(!res.headersSent)json(res,400,{error:err.message});else res.end();}
});
const timer=setInterval(()=>{game.step();for(const [token,s]of streams){if(!game.rooms.has(s.room.code)){s.res.end();streams.delete(token);continue;}if(s.res.writableLength>262144){s.res.end();streams.delete(token);continue;}s.res.write(`data: ${JSON.stringify(game.view(s.room,s.player))}\n\n`);}for(const[ip,r]of limits)if(Date.now()-r.at>60000)limits.delete(ip);},100);
timer.unref();
server.listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log(`DEAD SHIFT listening on 0.0.0.0:${server.address().port}`));
process.on('SIGTERM',()=>{for(const s of streams.values())s.res.end();server.close(()=>process.exit(0));setTimeout(()=>process.exit(0),3000).unref();});
