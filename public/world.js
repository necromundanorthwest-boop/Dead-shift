export const WORLD={width:960,height:720};
export const ROOMS=[
 {id:'generator',name:'GENERATOR',x:32,y:32,w:264,h:176,tone:'#30332e'},
 {id:'workshop',name:'WORKSHOP',x:348,y:32,w:264,h:176,tone:'#32302a'},
 {id:'relay',name:'RELAY CONTROL',x:664,y:32,w:264,h:176,tone:'#26363a'},
 {id:'sump',name:'SUMP PUMPS',x:32,y:272,w:264,h:176,tone:'#293b35'},
 {id:'concourse',name:'CONCOURSE',x:348,y:272,w:264,h:176,tone:'#343630'},
 {id:'security',name:'SECURITY',x:664,y:272,w:264,h:176,tone:'#35302f'},
 {id:'air',name:'VENTILATION',x:32,y:512,w:264,h:176,tone:'#2b3636'},
 {id:'cargo',name:'CARGO / LIFT CONTROL',x:348,y:512,w:264,h:176,tone:'#35312b'},
 {id:'lift',name:'EVACUATION',x:664,y:512,w:264,h:176,tone:'#2b373a'}
];
export const CORRIDORS=[];
for(let row=0;row<3;row++)for(let col=0;col<2;col++)CORRIDORS.push({x:288+col*316,y:102+row*240,w:68,h:40});
for(let row=0;row<2;row++)for(let col=0;col<3;col++)CORRIDORS.push({x:144+col*316,y:200+row*240,w:40,h:80});
export const STATIONS=[
 {id:'power',name:'Power core',room:'generator',x:164,y:98,template:0,critical:true},
 {id:'relay',name:'Relay array',room:'relay',x:796,y:98,template:1,critical:true},
 {id:'air',name:'Ventilation',room:'air',x:164,y:578,template:2,critical:true},
 {id:'lift',name:'Lift control',room:'cargo',x:480,y:578,template:3,critical:true},
 {id:'pumps',name:'Purge pumps',room:'sump',x:164,y:338,template:4,critical:false},
 {id:'filters',name:'Filter stock',room:'workshop',x:480,y:98,template:5,critical:false},
 {id:'security',name:'Signal repeater',room:'security',x:796,y:338,template:6,critical:false}
];
export const TASKS=[
 {name:'POWER COUPLING',hint:'Close the highlighted circuit contacts in order.',labels:['CONTACT A','CONTACT B','CONTACT C','CONTACT D']},
 {name:'RELAY ALIGNMENT',hint:'Route the signal through the highlighted bearings.',labels:['NORTH','EAST','SOUTH','WEST']},
 {name:'PRESSURE BALANCE',hint:'Open each indicated pressure valve.',labels:['INTAKE','BYPASS','RETURN','EXHAUST']},
 {name:'LIFT RESET',hint:'Acknowledge the indicated interlocks.',labels:['BRAKE','CABLE','DOOR','MOTOR']},
 {name:'SUMP PURGE',hint:'Cycle the highlighted pump stages.',labels:['DRAIN','FLUSH','PRIME','SEAL']},
 {name:'FILTER REPLACEMENT',hint:'Process the cartridges in the indicated order.',labels:['RELEASE','REMOVE','REPLACE','LATCH']},
 {name:'SIGNAL CALIBRATION',hint:'Match the highlighted frequency channels.',labels:['CH 01','CH 02','CH 03','CH 04']}
];
export const CALLSIGNS=['RATCHET','MOTH','CINDER','HEX','WIRE','GRIT'];
export const COLORS=['#ffca70','#86dbe8','#d2a9d7','#ff9b89','#afc77b','#bcc7d7'];
export const inside=(p,r,pad=0)=>p.x>=r.x+pad&&p.x<=r.x+r.w-pad&&p.y>=r.y+pad&&p.y<=r.y+r.h-pad;
export const roomAt=p=>ROOMS.find(r=>inside(p,r))?.id??'passage';
export const walkable=p=>[...ROOMS,...CORRIDORS].some(r=>inside(p,r));
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function visible(a,b,radius){
 if(distance(a,b)>radius)return false;
 const steps=Math.max(1,Math.ceil(distance(a,b)/8));
 for(let i=0;i<=steps;i++)if(!walkable({x:a.x+(b.x-a.x)*i/steps,y:a.y+(b.y-a.y)*i/steps}))return false;
 return true;
}
