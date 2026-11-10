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
const SUPABASE_URL='https://jrjomdbxdcdatxyuljle.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_RrweVUgPdmz6LwGl5QK-yA_RixjKdP1';
const ACCOUNT_STATE_KEYS=['pl_saved','pl_folders','pl_hist','pl_last','pl_rank','pl_prefs'];
function pulse(){return{
 user:'',nameInput:'',emailInput:'',passwordInput:'',authOpen:'',authError:'',authMessage:'',authBusy:false,authSession:null,accountId:'',accountSyncTimer:null,accountSyncQueue:Promise.resolve(),syncError:'',menu:false,tab:'home',homeQuery:'',
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
 sv(k,v){try{localStorage.setItem(this.accountId&&ACCOUNT_STATE_KEYS.includes(k)?`${k}:${this.accountId}`:k,JSON.stringify(v))}catch(error){console.error('Could not save local app data:',error);this.syncError='Data tidak dapat disimpan di perangkat ini.'}if(this.accountId&&ACCOUNT_STATE_KEYS.includes(k))this.scheduleAccountSync()},
 async init(){if(window.visualViewport){const f=()=>{if(this.kb)this.vv()};visualViewport.addEventListener('resize',f);visualViewport.addEventListener('scroll',f)}await this.restoreAuthSession()},
 async supabaseRequest(path,{method='GET',body,token=SUPABASE_PUBLISHABLE_KEY}={}){const response=await fetch(`${SUPABASE_URL}${path}`,{method,headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${token}`,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});const payload=await response.json().catch(()=>null);if(!response.ok){const error=new Error(payload?.msg||payload?.message||payload?.error_description||payload?.error||`Permintaan gagal (${response.status}).`);error.status=response.status;throw error}return payload},
 async accountDataRequest(session,userId,method='GET',data){const url=`${SUPABASE_URL}/rest/v1/account_data${method==='GET'?`?select=data&user_id=eq.${encodeURIComponent(userId)}`:'?on_conflict=user_id'}`;const response=await fetch(url,{method,headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${session.access_token}`,'Content-Type':'application/json',...(method==='POST'?{Prefer:'resolution=merge-duplicates,return=minimal'}:{})},...(data?{body:JSON.stringify({user_id:userId,data,updated_at:new Date().toISOString()})}:{})});const payload=await response.json().catch(()=>null);if(!response.ok){const error=new Error(payload?.message||payload?.details||payload?.hint||`Gagal menyinkronkan data akun (${response.status}).`);error.status=response.status;throw error}return payload},
 accountSnapshot(){return{saved:this.saved,folders:this.folders,hist:this.hist,last:this.lastView,ranked:this.ranked,prefs:{fs:this.fs,speed:this.speed}}},
 applyAccountData(data={}){this.saved=Array.isArray(data.saved)?data.saved:[];this.folders=Array.isArray(data.folders)?data.folders:[];this.hist=Array.isArray(data.hist)?data.hist:[];this.lastView=data.last||null;this.ranked=(Array.isArray(data.ranked)?data.ranked:[]).sort((a,b)=>b.openedCount-a.openedCount);if(data.prefs?.fs)this.fs=data.prefs.fs;if(data.prefs?.speed)this.speed=data.prefs.speed},
 readAccountLocal(userId){const state={};let exists=false;for(const key of ACCOUNT_STATE_KEYS){const value=localStorage.getItem(`${key}:${userId}`);if(value!==null)exists=true;try{state[key]=value===null?undefined:JSON.parse(value)}catch(error){console.error(`Could not read local ${key} for account:`,error)}}return{exists,data:{saved:state.pl_saved,folders:state.pl_folders,hist:state.pl_hist,last:state.pl_last,ranked:state.pl_rank,prefs:state.pl_prefs}}},
 readLegacyAccount(){const state={};for(const key of ACCOUNT_STATE_KEYS){try{const value=localStorage.getItem(key);state[key]=value===null?undefined:JSON.parse(value)}catch(error){console.error(`Could not read legacy ${key}:`,error)}}return{saved:state.pl_saved,folders:state.pl_folders,hist:state.pl_hist,last:state.pl_last,ranked:state.pl_rank,prefs:state.pl_prefs}},
 writeAccountLocal(userId,data){for(const [key,value] of Object.entries({pl_saved:data.saved,pl_folders:data.folders,pl_hist:data.hist,pl_last:data.last,pl_rank:data.ranked,pl_prefs:data.prefs})){try{if(value!==undefined)localStorage.setItem(`${key}:${userId}`,JSON.stringify(value))}catch(error){console.error(`Could not cache local ${key}:`,error)}}},
 async activateAuthSession(session){const userId=session.user?.id;if(!userId)throw new Error('Supabase tidak mengembalikan identitas akun. Silakan login kembali.');let verifiedUser;try{verifiedUser=await this.supabaseRequest('/auth/v1/user',{token:session.access_token})}catch(error){if(error.status===401||error.status===404){const invalidSession=new Error('Akun tidak ditemukan atau sesi lama sudah tidak berlaku. Silakan daftar atau login kembali.');invalidSession.status=401;throw invalidSession}throw error}if(verifiedUser.id!==userId){const invalidSession=new Error('Akun tidak ditemukan atau sesi lama sudah tidak berlaku. Silakan daftar atau login kembali.');invalidSession.status=401;throw invalidSession}session={...session,user:verifiedUser};this.saveAuthSession(session);clearTimeout(this.accountSyncTimer);await this.accountSyncQueue;const rows=await this.accountDataRequest(session,userId);let data;if(rows.length){data=rows[0].data||{}}else{const cached=this.readAccountLocal(userId);if(cached.exists)data=cached.data;else if(!localStorage.getItem('pl_legacy_owner'))data=this.readLegacyAccount();else data={};await this.accountDataRequest(session,userId,'POST',data)}if(!localStorage.getItem('pl_legacy_owner'))localStorage.setItem('pl_legacy_owner',userId);this.accountId=userId;this.applyAccountData(data);this.writeAccountLocal(userId,this.accountSnapshot());this.syncError='';this.user=verifiedUser.user_metadata?.username||verifiedUser.email||''},
 saveAuthSession(session){this.authSession=session;try{localStorage.setItem('pl_auth_session',JSON.stringify(session))}catch(error){console.error('Could not save authentication session:',error)}},
 scheduleAccountSync(){clearTimeout(this.accountSyncTimer);this.accountSyncTimer=setTimeout(()=>{this.accountSyncQueue=this.accountSyncQueue.then(()=>this.syncAccountData()).catch(error=>{console.error('Account data sync failed:',error);this.syncError=error.status===404?'Tabel sinkronisasi akun belum tersedia. Jalankan SQL terbaru dari supabase/schema.sql.':'Sinkronisasi gagal. Periksa koneksi, lalu ubah data lagi untuk mencoba ulang.'})},500)},
 async flushAccountSync(){clearTimeout(this.accountSyncTimer);this.accountSyncQueue=this.accountSyncQueue.catch(error=>{console.error('Previous account data sync failed:',error)}).then(()=>this.syncAccountData());await this.accountSyncQueue},
 async syncAccountData(){if(!this.accountId||!this.authSession?.access_token)return;const userId=this.accountId,data=this.accountSnapshot();try{await this.accountDataRequest(this.authSession,userId,'POST',data)}catch(error){if(error.status!==401)throw error;const session=await this.refreshAuthSession();await this.accountDataRequest(session,userId,'POST',data)}this.syncError='';this.writeAccountLocal(userId,this.accountSnapshot())},
 async refreshAuthSession(){const refreshToken=this.authSession?.refresh_token;if(!refreshToken)throw new Error('Sesi login berakhir. Silakan login kembali.');const session=await this.supabaseRequest('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:refreshToken}});this.saveAuthSession(session);return session},
 async restoreAuthSession(){let session=this.ld('pl_auth_session',null);if(!session?.access_token||!session?.refresh_token)return;this.authSession=session;try{if((session.expires_at||0)*1000<=Date.now()+60000)session=await this.refreshAuthSession();await this.activateAuthSession(session)}catch(error){console.error('Supabase session restoration failed:',error);if(error.status===400||error.status===401){this.authSession=null;this.accountId='';localStorage.removeItem('pl_auth_session')}this.authOpen='login';this.authError=error.status===404&&/account_data/i.test(error.message)?'Setup sinkronisasi akun belum selesai. Jalankan SQL terbaru dari supabase/schema.sql di Supabase SQL Editor.':error.status===401?'Akun tidak ditemukan atau sesi lama tidak berlaku. Silakan daftar atau login kembali.':'Tidak dapat memverifikasi akun di Supabase. Periksa koneksi dan coba lagi.'}},
 openAuth(mode){this.authOpen=mode;this.authError='';this.authMessage='';this.passwordInput=''},
 validateAuth(){if(this.authOpen==='create'){const username=this.nameInput.trim();if(!/^[a-zA-Z0-9_]{3,24}$/.test(username))return 'Username harus 3–24 karakter, hanya huruf, angka, dan garis bawah.'}if(this.passwordInput.length<8||this.passwordInput.length>72)return 'Password harus 8–72 karakter.';return ''},
 async login(){
  this.authError='';this.authMessage='';
  const validation=this.validateAuth();if(validation){this.authError=validation;return}
  this.authBusy=true;const email=this.emailInput.trim().toLowerCase();
  try{
   if(this.authOpen==='create'){
    const username=this.nameInput.trim();
    const available=await this.supabaseRequest('/rest/v1/rpc/is_username_available',{method:'POST',body:{candidate_username:username}});
    if(!available){this.authError='Username sudah digunakan.';return}
    const result=await this.supabaseRequest('/auth/v1/signup',{method:'POST',body:{email,password:this.passwordInput,data:{username}}});
    if(result.user&&Array.isArray(result.user.identities)&&result.user.identities.length===0){this.authError='Email sudah digunakan.'}
    else if(result.session){await this.activateAuthSession(result.session);this.authOpen=''}
    else{this.authMessage='Akun dibuat. Periksa email untuk konfirmasi sebelum login.'}
   }else{
    const session=await this.supabaseRequest('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password:this.passwordInput}});
    await this.activateAuthSession(session);this.authOpen='';
   }
   this.passwordInput='';
  }catch(error){
   console.error('Supabase authentication failed:',error);const message=error.message||'';
   if(error.status===404&&/is_username_available/i.test(message)){this.authError='Setup database Supabase belum selesai. Jalankan supabase/schema.sql di Supabase Dashboard → SQL Editor, lalu coba daftar lagi.'}
   else if(error.status===404&&/account_data/i.test(message)){this.authError='Setup sinkronisasi akun belum selesai. Jalankan SQL terbaru dari supabase/schema.sql di Supabase SQL Editor.'}
   else if(/profiles_username_lower_key|duplicate key value.*username/i.test(message)){this.authError='Username sudah digunakan.'}
   else if(this.authOpen==='create'&&/email_exists|email.*(already|registered|exist)|already registered/i.test(message)){this.authError='Email sudah digunakan.'}
   else if(this.authOpen==='login'&&/invalid login credentials|invalid_credentials|user not found/i.test(message)){this.authError='Email/password salah atau akun belum terdaftar. Silakan daftar dulu.'}
   else{this.authError=message||'Autentikasi gagal. Coba lagi.'}
  }finally{this.authBusy=false}
 },
 async logout(){try{await this.flushAccountSync()}catch(error){console.error('Could not sync account data before logout:',error);this.syncError='Data belum tersinkron. Periksa koneksi sebelum logout.';return}this.menu=false;this.addTarget=null;this.delAsk=false;this.fview=null;this.folderSheet=false;this.histOpen=false;this.tab='home';const token=this.authSession?.access_token;this.authSession=null;this.accountId='';this.user='';localStorage.removeItem('pl_auth_session');this.close();if(token){try{await this.supabaseRequest('/auth/v1/logout',{method:'POST',token})}catch(error){console.error('Supabase logout failed:',error);this.authError='Logout lokal berhasil, tetapi sesi di server gagal ditutup.'}}},
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
