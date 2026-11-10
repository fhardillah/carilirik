const P={
 trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6M14 11v6"/>',
 minus:'<path d="M5 12h14"/>',
 mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 venue:'<path d="M18 8c0 3.6-3.9 7.4-5.4 8.8a1 1 0 0 1-1.2 0C9.9 15.4 6 11.6 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.7 14H5a1 1 0 0 0-.9.7l-2 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .9-1.3l-2-6a1 1 0 0 0-.9-.7h-3.7"/>',
 history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
 arrowur:'<path d="M7 17 17 7M8 7h9v9"/>',
 arrowr:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 x:'<path d="M18 6 6 18M6 6l12 12"/>',
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
 book:'<path d="M5 4a2 2 0 0 1 2-2h12v16H7a2 2 0 0 0-2 2z"/><path d="M5 20a2 2 0 0 0 2 2h12v-4"/><path d="M10 7h5"/>',
 user:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M6.2 18.5a7 7 0 0 1 11.6 0"/>',
 music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
 pen:'<path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
 play:'<path d="M7 4v16l13-8z"/>',
 pause:'<path d="M8 5v14M16 5v14"/>',
 back:'<path d="m15 18-6-6 6-6"/>',
 bookmark:'<path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
 tick:'<path d="m5 12 4 4L19 6"/>',
 sad:'<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01"/>',
 timer:'<path d="M10 2h4M12 14l3-3"/><circle cx="12" cy="14" r="8"/>',
 check:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'
};
function ic(n,s,f){return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="'+(f?'currentColor':'none')+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+P[n]+'</svg>'}
const scriptLoads=new Map();
function loadScript(src,isLoaded){
 if(isLoaded())return Promise.resolve();
 if(!scriptLoads.has(src)){
  const load=new Promise((resolve,reject)=>{
   const script=document.createElement('script');
   script.src=src;
   script.async=true;
   script.onload=resolve;
   script.onerror=()=>reject(new Error('Failed to load '+src));
   document.head.appendChild(script);
  }).catch(error=>{scriptLoads.delete(src);throw error});
  scriptLoads.set(src,load);
 }
 return scriptLoads.get(src);
}
const PH='Ini lirik contoh untuk prototype.\n\nDi versi live, lirik asli diambil\ndari database LRCLIB.';
function pulse(){return{
 user:'',nameInput:'',authOpen:'',menu:false,tab:'home',homeQuery:'',
 qTitle:'',qArtist:'',results:[],loading:false,searched:false,offline:false,
 ranked:[],saved:[],sel:null,dwell:0,met:false,timer:null,mode:'orig',cjk:false,fs:15,speed:2,auto:false,raf:null,last:0,acc:0,hideBar:false,lastTop:0,lock:0,latinOut:'',showResults:false,hist:[],kb:false,vvH:0,vvTop:0,histOpen:false,lastQ:{t:'',a:''},lastView:null,folders:[],folderSheet:false,folderName:'',folderErr:'',fview:null,pick:false,addTarget:null,searchReturnTab:'home',delAsk:false,rmSong:null,prevTab:'home',pickSong:null,
 db:[
  ...["Rolling In The Deep", "To Be Loved", "Someone Like You", "He Won't Go", "Runaway", "Water Under The Bridge", "Skyfall", "Hello", "Easy On Me", "Set Fire To The Rain", "Chasing Pavements", "Make You Feel My Love", "Oh My God", "I Drink Wine", "Cold Shoulder", "River Lea", "Cry Your Heart Out", "Painting Pictures", "Hometown Glory", "One And Only", "My Same", "Daydreamer", "Tired", "Promise This", "Woman Like Me", "Turning Tables", "Send My Love (To Your New Lover)", "When We Were Young"].map((t,i)=>({id:'a'+i,trackName:t,artistName:'Adele',plainLyrics:PH})),
  ...['Good Riddance','Jesus Of Suburbia','Basket Case','Know Your Enemy','American Idiot','Last Night On Earth','Still Breathing','Boulevard Of Broken Dreams','Stray Hearts'].map((t,i)=>({id:'g'+i,trackName:t,artistName:'Green Day',plainLyrics:PH})),
  {id:'j1',trackName:'Contoh Lagu Jepang',artistName:'Demo Artist',plainLyrics:'夜空に星が光る\n君の声が聞こえる\nまた明日も会えるよね\n\n風の中で歌おう\nこの道をずっと歩こう',latinLyrics:'Yozora ni hoshi ga hikaru\nKimi no koe ga kikoeru\nMata ashita mo aeru yo ne\n\nKaze no naka de utaou\nKono michi o zutto arukou'},
  {id:'z1',trackName:'Contoh Lagu Mandarin',artistName:'Demo Artist',plainLyrics:'你好，今天天氣很好\n我們一起去散步\n微風輕輕吹過\n心情也很輕鬆'},
  {id:'k1',trackName:'Contoh Lagu Korea',artistName:'Demo Artist',plainLyrics:'오늘은 날씨가 좋아요\n우리 같이 걸어요\n바람이 불어와요\n마음이 가벼워요'}
 ],
 ld(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
 sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
 init(){this.user=this.ld('pl_user','');this.ranked=this.ld('pl_rank',[]).sort((a,b)=>b.openedCount-a.openedCount);this.saved=this.ld('pl_saved',[]);this.hist=this.ld('pl_hist',[]);this.lastView=this.ld('pl_last',null);this.folders=this.ld('pl_folders',[]);if(window.visualViewport){const f=()=>{if(this.kb)this.vv()};visualViewport.addEventListener('resize',f);visualViewport.addEventListener('scroll',f)}const p=this.ld('pl_prefs',{});if(p.fs)this.fs=p.fs;if(p.speed)this.speed=p.speed},
 login(){this.user=this.nameInput.trim()||'Guest';this.sv('pl_user',this.user);this.authOpen=''},
 logout(){this.menu=false;this.addTarget=null;this.delAsk=false;this.fview=null;this.folderSheet=false;this.histOpen=false;this.tab='home';this.user='';this.sv('pl_user','');this.close()},
 go(t){this.tab=t;this.histOpen=false;this.menu=false;this.fview=null;this.folderSheet=false;this.addTarget=null;this.delAsk=false;this.pickSong=null},
 openSearch(t){
  if(this.tab!=='search')this.searchReturnTab=this.tab;
  if(t!==undefined)this.addTarget=t;
  this.folderSheet=false;this.histOpen=false;this.tab='search';this.kb=false;
 },
 closeSearch(){this.tab=this.searchReturnTab;this.addTarget=null;this.kb=false},
 fit(el){el.style.height='auto';if(this.qTitle.length)el.style.height=el.scrollHeight+'px'},
 coarse(){return !!window.matchMedia&&matchMedia('(pointer:coarse)').matches},
 vv(){const v=window.visualViewport;this.vvH=v?v.height:window.innerHeight;this.vvTop=v?v.offsetTop:0},
 focusIn(){if(this.coarse()){this.vv();this.kb=true}},
 focusOut(){setTimeout(()=>{const a=document.activeElement;if(!a||!(a.tagName==='TEXTAREA'||a.tagName==='INPUT'))this.kb=false},200)},
 submitSearch(){
  if(this.tab==='results')return;
  if(!this.qTitle.trim()&&!this.qArtist.trim())return;
  const activeElement=document.activeElement;
  this.folderSheet=false;this.histOpen=false;this.kb=false;
  if(this.addTarget)this.fview=null;
  this.addHist();
  this.search();
  this.$nextTick(()=>activeElement?.blur?.());
 },
 addHist(){
  const t=this.qTitle.trim(),a=this.qArtist.trim();
  this.hist=[{t,a},...this.hist.filter(h=>h.t.toLowerCase()!==t.toLowerCase()||h.a.toLowerCase()!==a.toLowerCase())].slice(0,10);
  this.sv('pl_hist',this.hist);
 },
 useHist(h){this.qTitle=h.t;this.qArtist=h.a;this.histOpen=false;this.openSearch()},
 openHist(){this.histOpen=true},
 clearHist(){this.hist=[];this.sv('pl_hist',[])},
 get folderCards(){return [{id:'all',name:'Semua Lagu',count:this.saved.length},...this.folders.map(f=>({id:f.id,name:f.name,count:f.ids.filter(i=>this.savedHas(i)).length}))]},
 get fName(){if(this.fview==='all')return 'Semua Lagu';const f=this.folders.find(x=>x.id===this.fview);return f?f.name:''},
 get fSongs(){
  if(!this.fview)return [];
  if(this.fview==='all')return this.saved;
  const f=this.folders.find(x=>x.id===this.fview);
  return f?this.saved.filter(s=>f.ids.includes(s.id)):[];
 },
 openFolderSheet(){if(this.tab!=='book')return;this.folderName='';this.folderErr='';this.kb=false;this.folderSheet=true;this.$nextTick(()=>{if(this.$refs.fInput)this.$refs.fInput.focus()})},
 createFolder(){
  const n=this.folderName.trim();
  if(!n){this.folderErr='Nama folder tidak boleh kosong.';return}
  if(n.toLowerCase()==='semua lagu'||this.folders.some(f=>f.name.toLowerCase()===n.toLowerCase())){this.folderErr='Nama folder sudah dipakai.';return}
  this.folders=[...this.folders,{id:'f'+Date.now(),name:n,ids:[]}];this.sv('pl_folders',this.folders);this.folderSheet=false;
 },
 openFolder(id){this.fview=id;this.pick=false;this.rmSong=null;this.delAsk=false},
 closeFolder(){this.fview=null;this.pick=false},
 inFolder(id){const f=this.folders.find(x=>x.id===this.fview);return !!f&&f.ids.includes(id)},
 toggleInFolder(song){
  const f=this.folders.find(x=>x.id===this.fview);if(!f)return;
  f.ids=f.ids.includes(song.id)?f.ids.filter(i=>i!==song.id):[...f.ids,song.id];
  this.folders=[...this.folders];this.sv('pl_folders',this.folders);
 },
 deleteFolder(){this.folders=this.folders.filter(x=>x.id!==this.fview);this.sv('pl_folders',this.folders);this.delAsk=false;this.closeFolder()},
 confirmRemove(){
  const s=this.rmSong;this.rmSong=null;if(!s)return;
  if(this.fview==='all')this.toggleSaved(s);else this.removeFromFolder(s);
 },
 removeFromFolder(song){
  const f=this.folders.find(x=>x.id===this.fview);if(!f)return;
  f.ids=f.ids.filter(i=>i!==song.id);this.folders=[...this.folders];this.sv('pl_folders',this.folders);
 },
 stripFolders(id){this.folders=this.folders.map(f=>({...f,ids:f.ids.filter(i=>i!==id)}));this.sv('pl_folders',this.folders)},
 inFolderId(fid,id){
  if(fid==='all')return this.savedHas(id);
  const f=this.folders.find(x=>x.id===fid);return !!f&&f.ids.includes(id);
 },
 toggleFolder(fid,song){
  if(!song)return;
  if(fid==='all'){this.toggleSaved(song);return}
  const f=this.folders.find(x=>x.id===fid);if(!f)return;
  if(f.ids.includes(song.id))f.ids=f.ids.filter(i=>i!==song.id);
  else{
   if(!this.savedHas(song.id)){this.saved=[...this.saved,song];this.sv('pl_saved',this.saved)}
   f.ids=[...f.ids,song.id];
  }
  this.folders=[...this.folders];this.sv('pl_folders',this.folders);
 },
 openSaveSheet(s){this.pickSong=s},
 closeResults(){this.tab='search'},
 get tName(){if(this.addTarget==='all')return 'Semua Lagu';const f=this.folders.find(x=>x.id===this.addTarget);return f?f.name:''},
 inTarget(id){
  if(this.addTarget==='all')return this.savedHas(id);
  const f=this.folders.find(x=>x.id===this.addTarget);return !!f&&f.ids.includes(id);
 },
 toggleTarget(song){
  if(this.addTarget==='all'){this.toggleSaved(song);return}
  const f=this.folders.find(x=>x.id===this.addTarget);if(!f)return;
  if(f.ids.includes(song.id))f.ids=f.ids.filter(i=>i!==song.id);
  else{
   if(!this.savedHas(song.id)){this.saved=[...this.saved,song];this.sv('pl_saved',this.saved)}
   f.ids=[...f.ids,song.id];
  }
  this.folders=[...this.folders];this.sv('pl_folders',this.folders);
 },
 finishAdd(){const t=this.addTarget;this.addTarget=null;this.tab='book';this.fview=t},
 savedHas(id){return this.saved.some(x=>x.id===id)},
 songMeta(song){return [song?.artistName,song?.albumName].filter(Boolean).join(' · ')},
 toggleSaved(s){
  const had=this.savedHas(s.id);this.saved=had?this.saved.filter(x=>x.id!==s.id):[...this.saved,s];if(had)this.stripFolders(s.id);
  this.sv('pl_saved',this.saved);
 },
 fromHome(){this.qTitle=this.homeQuery.trim();this.qArtist='';this.openSearch(null)},
 async search(){
  const t=this.qTitle.trim().toLowerCase(),a=this.qArtist.trim().toLowerCase();
  if(!t&&!a)return;
  this.loading=true;this.searched=true;this.results=[];this.offline=false;this.prevTab=this.tab==='results'?this.prevTab:(this.tab==='search'?this.searchReturnTab:this.tab);this.tab='results';this.lastQ={t:this.qTitle.trim(),a:this.qArtist.trim()};
  const local=this.db.filter(i=>{const tn=i.trackName.toLowerCase(),an=i.artistName.toLowerCase();return t&&!a?(tn.includes(t)||an.includes(t)):(!t||tn.includes(t))&&(!a||an.includes(a))});
  try{
   let u='https://lrclib.net/api/search?';
   if(t&&a)u+='track_name='+encodeURIComponent(this.qTitle.trim())+'&artist_name='+encodeURIComponent(this.qArtist.trim());
   else u+='q='+encodeURIComponent((this.qTitle||this.qArtist).trim());
   const r=await fetch(u);if(!r.ok)throw 0;
   const d=await r.json();
   this.results=d.map(x=>({id:'l'+x.id,trackName:x.trackName||x.name||'Unknown',artistName:x.artistName||'Unknown',albumName:x.albumName||'',plainLyrics:x.plainLyrics||(x.syncedLyrics?x.syncedLyrics.replace(/\[\d+:\d+(\.\d+)?\]\s?/g,'').trim():'Lirik tidak tersedia.')}));
  }catch(e){this.results=local;this.offline=true}
  this.loading=false;
 },
 open(s){
  this.lastView={id:s.id,trackName:s.trackName,artistName:s.artistName,albumName:s.albumName||'',plainLyrics:s.plainLyrics,latinLyrics:s.latinLyrics};this.sv('pl_last',this.lastView);
  const f=this.db.find(d=>d.id===s.id);
  this.sel=Object.assign({},s,{latinLyrics:s.latinLyrics||(f&&f.latinLyrics)});
  this.dwell=0;this.met=false;this.mode='orig';this.stopAuto();this.hideBar=false;this.lastTop=0;this.latinOut='';this.$nextTick(()=>{if(this.$refs.lyr)this.$refs.lyr.scrollTop=0});
  this.cjk=/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/.test(s.plainLyrics||'');
  clearInterval(this.timer);this.timer=setInterval(()=>this.tick(),1000);
 },
 tick(){this.dwell++;if(this.dwell>=60&&!this.met){this.met=true;this.count(this.sel)}},
 skip(){this.dwell=60;this.tick()},
 setFs(d){this.fs=Math.min(28,Math.max(12,this.fs+d));this.savePrefs()},
 setSpeed(d){this.speed=Math.min(6,Math.max(1,this.speed+d));this.savePrefs()},
 savePrefs(){this.sv('pl_prefs',{fs:this.fs,speed:this.speed})},
 toggleAuto(){if(this.auto){this.stopAuto();this.hideBar=false}else this.startAuto()},
 onScroll(e){
  const y=e.target.scrollTop,d=y-this.lastTop;this.lastTop=y;
  if(Date.now()<this.lock)return;
  let h=this.hideBar;
  if(y<=8)h=false;else if(d>6)h=true;else if(d<-6&&!this.auto)h=false;
  if(h!==this.hideBar){this.hideBar=h;this.lock=Date.now()+350}
 },
 startAuto(){
  const el=this.$refs.lyr;if(!el)return;
  if(el.scrollTop+el.clientHeight>=el.scrollHeight-2)el.scrollTop=0;
  this.auto=true;this.last=0;this.acc=0;
  const step=t=>{
   if(!this.auto)return;
   if(this.last){this.acc+=(t-this.last)/1000*this.speed*12;const px=Math.floor(this.acc);if(px>=1){el.scrollTop+=px;this.acc-=px}}
   this.last=t;
   if(el.scrollTop+el.clientHeight>=el.scrollHeight-2){this.stopAuto();this.hideBar=false;return}
   this.raf=requestAnimationFrame(step);
  };
  this.raf=requestAnimationFrame(step);
 },
 stopAuto(){this.auto=false;cancelAnimationFrame(this.raf)},
 close(){clearInterval(this.timer);this.stopAuto();this.sel=null},
 count(s){
  const l=[...this.ranked];
  const e=l.find(x=>x.trackName.toLowerCase()===s.trackName.toLowerCase()&&x.artistName.toLowerCase()===s.artistName.toLowerCase());
  if(e){e.openedCount++;e.albumName=e.albumName||s.albumName||''}else l.push({id:s.id,trackName:s.trackName,artistName:s.artistName,albumName:s.albumName||'',plainLyrics:s.plainLyrics,latinLyrics:s.latinLyrics,openedCount:1});
  l.sort((a,b)=>b.openedCount-a.openedCount);this.ranked=l;this.sv('pl_rank',l);
 },
 async doLatin(){
  const t=(this.sel&&this.sel.plainLyrics)||'';
  this.latinOut='';
  if(/[\u3040-\u30ff]/.test(t)&&/[\u4e00-\u9fff]/.test(t)&&!/[\uac00-\ud7af]/.test(t)){
   this.latinOut='Memuat kamus Jepang (hanya saat pertama kali)…';
   const k=await this.getKuro();
   if(k){
    try{
     const out=[];
     for(const l of t.split('\n')){
      if(!l.trim()){out.push('');continue}
      let s=await k.convert(l,{to:'romaji',mode:'spaced',romajiSystem:'hepburn'});
      s=s.replace(/ā/g,'aa').replace(/ī/g,'ii').replace(/ū/g,'uu').replace(/ē/g,'ee').replace(/ō/g,'ou');
      out.push(s.charAt(0).toUpperCase()+s.slice(1));
     }
     this.latinOut=out.join('\n');return;
    }catch(e){}
   }
  }
  if(/[\u4e00-\u9fff]/.test(t)&&!(/[\u3040-\u30ff]/.test(t)||/[\uac00-\ud7af]/.test(t))){
   try{
    await loadScript('https://cdn.jsdelivr.net/npm/pinyin-pro@3.26.0/dist/index.js',()=>!!window.pinyinPro);
   }catch(error){
    console.error(error);
    this.latinOut='Modul transliterasi gagal dimuat. Coba muat ulang halaman.';
    return;
   }
  }
  this.latinOut=this.latinize(t);
 },
 async getKuro(){
  if(window.__kuro!==undefined)return window.__kuro;
  try{
   await loadScript('https://cdn.jsdelivr.net/npm/kuroshiro@1.2.0/dist/kuroshiro.min.js',()=>!!window.Kuroshiro);
   await loadScript('https://cdn.jsdelivr.net/npm/kuroshiro-analyzer-kuromoji@1.1.0/dist/kuroshiro-analyzer-kuromoji.min.js',()=>!!window.KuromojiAnalyzer);
   if(!window.Kuroshiro||!window.KuromojiAnalyzer)throw 0;
   const K=Kuroshiro.default||Kuroshiro,A=KuromojiAnalyzer.default||KuromojiAnalyzer;
   const k=new K();
   await Promise.race([k.init(new A({dictPath:'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/'})),new Promise((_,r)=>setTimeout(r,25000))]);
   window.__kuro=k;
  }catch(e){window.__kuro=null}
  return window.__kuro;
 },
 ko(l){
  const I=['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'],
  V=['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'],
  F=['','k','k','k','n','n','n','t','l','k','m','l','l','l','p','l','m','p','p','t','t','ng','t','t','k','t','p','t'],
  L={1:'g',2:'kk',4:'n',7:'d',8:'r',16:'m',17:'b',19:'s',20:'ss',22:'j',23:'ch',24:'k',25:'t',26:'p',27:''};
  const ch=[...l];let r='',carry=null;
  for(let i=0;i<ch.length;i++){
   const c=ch[i].charCodeAt(0)-0xAC00;
   if(c<0||c>11171){r+=ch[i];carry=null;continue}
   const f=c%28,n=ch[i+1]?ch[i+1].charCodeAt(0)-0xAC00:-1;
   let lia=null;
   if(f&&f!==21&&n>=0&&n<=11171&&Math.floor(n/588)===11&&(f in L))lia=L[f];
   r+=(carry!==null?carry:I[Math.floor(c/588)])+V[Math.floor(c%588/28)]+(lia!==null?'':F[f]);
   carry=lia;
  }
  return r.charAt(0).toUpperCase()+r.slice(1);
 },
 ja(l){
  const B='あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉゔ',
  R='a i u e o ka ki ku ke ko sa shi su se so ta chi tsu te to na ni nu ne no ha hi fu he ho ma mi mu me mo ya yu yo ra ri ru re ro wa o n ga gi gu ge go za ji zu ze zo da ji zu de do ba bi bu be bo pa pi pu pe po a i u e o vu'.split(' ');
  const t=[...l].map(c=>{const k=c.charCodeAt(0);return k>=0x30a1&&k<=0x30f6?String.fromCharCode(k-0x60):c});
  let r='',gem=false;
  for(let i=0;i<t.length;i++){
   const c=t[i];
   if(c==='っ'){gem=true;continue}
   if(c==='ー'){const m=r.match(/[aiueo]$/);if(m)r+=m[0];continue}
   const j=B.indexOf(c);
   if(j<0){r+=c==='、'?',':c==='。'?'.':c;gem=false;continue}
   let s=R[j];const y='ゃゅょ'.indexOf(t[i+1]||'#');
   if(y>=0&&'きしちにひみりぎじびぴ'.includes(c)){const st=s.slice(0,-1),v='auo'[y];s=/(sh|ch|j)$/.test(st)?st+v:st+'y'+v;i++}
   if(gem){s=(s[0]==='c'?'t':s[0])+s;gem=false}
   r+=s;
  }
  r=r.replace(/\s+/g,' ').trim();
  return r.charAt(0).toUpperCase()+r.slice(1);
 },
 latinize(t){
  const msg='Transliterasi Latin belum tersedia untuk bahasa ini.';
  if(/[\uac00-\ud7af]/.test(t))return t.split('\n').map(l=>this.ko(l)).join('\n');
  if(/[\u3040-\u30ff]/.test(t)){const r=t.split('\n').map(l=>this.ja(l)).join('\n');return /[\u4e00-\u9fff]/.test(t)?r+'\n\n(Kanji butuh kamus yang tidak bisa dimuat di halaman ini, jadi ditampilkan apa adanya. Di versi yang di-host sendiri, kanji terbaca otomatis.)':r}
  if(!window.pinyinPro)return 'Modul transliterasi gagal dimuat. Coba muat ulang halaman.';
  try{
   return t.split('\n').map(l=>{
    if(!l.trim())return '';
    const r=pinyinPro.pinyin(l,{toneType:'symbol',nonZh:'consecutive'})
     .replace(/\s+/g,' ').replace(/\s*，\s*/g,', ').replace(/\s*。\s*/g,'. ').replace(/\s*？\s*/g,'? ').replace(/\s*！\s*/g,'! ')
     .replace(/\s+([,.!?])/g,'$1').trim();
    return r.charAt(0).toUpperCase()+r.slice(1);
   }).join('\n');
  }catch(e){return msg}
 },
 get isSaved(){return !!this.sel&&this.saved.some(x=>x.id===this.sel.id)},
 toggleSave(){
  if(!this.sel)return;
  const had=this.isSaved;this.saved=had?this.saved.filter(x=>x.id!==this.sel.id):[...this.saved,this.sel];if(had)this.stripFolders(this.sel.id);
  this.sv('pl_saved',this.saved);
 },
 get shown(){
  if(!this.sel)return '';
  if(this.mode==='latin')return this.sel.latinLyrics||this.latinOut||'Memuat transliterasi…';
  return this.sel.plainLyrics;
 }
}}

if ('serviceWorker' in navigator) {
 window.addEventListener('load', () => {
  navigator.serviceWorker.register('./service-worker.js')
   .catch(error => console.error('PWA service worker registration failed:', error));
 });
}
