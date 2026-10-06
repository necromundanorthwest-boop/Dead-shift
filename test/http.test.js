import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
test('four HTTP clients create, join, stream private state, ready, start, and reconnect',async()=>{
 const child=spawn(process.execPath,['server/http.js'],{env:{...process.env,PORT:'0'},stdio:['ignore','pipe','pipe']});
 let serverError='';child.stderr.on('data',d=>serverError+=d);let output='';const address=await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(Error('Server startup timeout: '+serverError)),5000);child.stdout.on('data',d=>{output+=d;const m=output.match(/0\.0\.0\.0:(\d+)/);if(m){clearTimeout(t);resolve('http://127.0.0.1:'+m[1]);}});child.on('error',reject);});
 const aborts=[];
 try{
 const post=async(path,data,session)=>{const res=await fetch(address+path+(session?'?room='+session.code:''),{method:'POST',headers:{'Content-Type':'application/json',...(session?{Authorization:'Bearer '+session.token}:{})},body:JSON.stringify(data)});return {status:res.status,data:await res.json()};};
 const health=await fetch(address+'/healthz');assert.equal(health.status,200);const home=await fetch(address+'/');assert.match(await home.text(),/DEAD SHIFT/);assert.ok(home.headers.get('content-security-policy').includes("frame-ancestors 'none'"));
 const a=(await post('/api/create',{name:'ONE'})).data;const clients=[a];for(const name of ['TWO','THREE','FOUR'])clients.push((await post('/api/join',{name,code:a.code})).data);
 const snapshots=[];const readers=[];for(const c of clients){const ac=new AbortController();aborts.push(ac);const res=await fetch(address+'/api/stream?room='+c.code,{headers:{Authorization:'Bearer '+c.token},signal:ac.signal});assert.equal(res.status,200);assert.match(res.headers.get('content-type'),/event-stream/);const reader=res.body.getReader();readers.push(reader);const first=await reader.read();const text=new TextDecoder().decode(first.value);const snapshot=JSON.parse(text.split('\n\n')[0].slice(6));assert.equal(snapshot.roster.length,4);assert.equal(snapshot.self.role,null);snapshots.push(snapshot);}
 for(const c of clients)assert.equal((await post('/api/action',{type:'ready',seq:1},c)).status,200);
 assert.equal((await post('/api/action',{type:'start',seq:2},clients[1])).status,400);
 assert.equal((await post('/api/action',{type:'start',seq:2},clients[0])).status,200);
 const roles=[];for(let i=0;i<4;i++){let snap;for(let tries=0;tries<30;tries++){const chunk=await readers[i].read();const lines=new TextDecoder().decode(chunk.value).split('\n\n').filter(Boolean);for(const line of lines){const v=JSON.parse(line.slice(6));if(v.phase==='reveal'){snap=v;break;}}if(snap)break;}assert.ok(snap,'received role reveal');roles.push(snap.self.role);assert.ok(snap.roster.every(p=>p.role===undefined));assert.ok(!JSON.stringify(snap).includes(clients[(i+1)%4].token));}
 assert.equal(roles.filter(r=>r==='infiltrator').length,1);
 aborts[0].abort();const recon=await fetch(address+'/api/stream?room='+a.code,{headers:{Authorization:'Bearer '+a.token},signal:(()=>{const ac=new AbortController();aborts.push(ac);return ac.signal;})()});const first=await recon.body.getReader().read();const s=JSON.parse(new TextDecoder().decode(first.value).split('\n\n')[0].slice(6));assert.equal(s.self.id,a.state.self.id);assert.equal(s.self.role,roles[0]);
 const cross=await fetch(address+'/api/create',{method:'POST',headers:{Origin:'https://evil.example','Content-Type':'application/json'},body:'{}'});assert.equal(cross.status,403);
 const bad=await fetch(address+'/api/stream?room='+a.code,{headers:{Authorization:'Bearer bogus'}});assert.equal(bad.status,400);
 assert.equal((await post('/api/join',{code:a.code,name:'LATE'})).status,400);
 }finally{for(const ac of aborts)ac.abort();child.kill('SIGTERM');await once(child,'exit');}
});
