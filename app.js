
(()=>{
'use strict';
const API='https://thecurushop.com';
const PLAY='https://play.google.com/store/apps/details?id=com.thecurushop.curugames';
const root=document.documentElement;
const qs=s=>document.querySelector(s);
const qsa=s=>[...document.querySelectorAll(s)];
const stored=localStorage.getItem('curu-theme');
const initial=stored||((window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark');
root.dataset.theme=initial;
const setTheme=t=>{root.dataset.theme=t;localStorage.setItem('curu-theme',t);document.querySelector('meta[name="theme-color"]')?.setAttribute('content',t==='light'?'#f3f1fb':'#090d18')};
qsa('[data-theme-toggle]').forEach(b=>b.addEventListener('click',()=>setTheme(root.dataset.theme==='light'?'dark':'light')));
const menu=qs('#mobileNav');
qs('[data-menu-toggle]')?.addEventListener('click',()=>{menu?.classList.toggle('open')});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
document.addEventListener('click',e=>{if(menu?.classList.contains('open')&&!e.target.closest('#mobileNav')&&!e.target.closest('[data-menu-toggle]'))menu.classList.remove('open')});

const text=(el,v)=>{if(el&&v!==undefined&&v!==null)el.textContent=String(v)};
let all=[],shown=12;
function cfgNumber(c,keys){for(const k of keys){const n=Number(c?.[k]);if(Number.isFinite(n)&&n>0)return n}return null}
async function loadConfig(){try{const r=await fetch(`${API}/api/games/config`,{mode:'cors',credentials:'omit'});if(!r.ok)return;const j=await r.json();const c=j.config||j;const ppm=cfgNumber(c,['pointsPerMinute','points_per_minute','gamePointsPerMinute']);const threshold=cfgNumber(c,['pointsConversionThreshold','conversionThreshold','pointsToCredit']);const credit=cfgNumber(c,['conversionCredit','creditPerConversion','conversionValue']);qsa('[data-live-ppm]').forEach(el=>text(el,ppm||1));if(ppm)qsa('[data-live-ppm-copy]').forEach(el=>text(el,`Eligible active online play currently earns ${ppm} CURU Point${ppm===1?'':'s'} per eligible minute.`));if(threshold&&credit)qsa('[data-live-conversion]').forEach(el=>text(el,`${threshold.toLocaleString()} eligible Points currently convert to ₹${credit.toLocaleString()} of Curu Store Credit.`))}catch(_){}}
function categories(){const s=qs('#proCategory');if(!s)return;const current=s.value;const vals=[...new Set(all.map(g=>(g.category_en||g.category||'Other').trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b));s.replaceChildren(new Option('All categories',''),...vals.map(v=>new Option(v,v)));s.value=vals.includes(current)?current:''}
function filtered(){const q=(qs('#proSearch')?.value||'').trim().toLowerCase();const cat=qs('#proCategory')?.value||'';return all.filter(g=>{const c=(g.category_en||g.category||'Other').trim();return(!cat||c===cat)&&(!q||`${g.title||''} ${c} ${g.description||''}`.toLowerCase().includes(q))})}
function render(){const grid=qs('#proGrid'),more=qs('#showMoreGames');if(!grid)return;const rows=filtered(),view=rows.slice(0,shown);grid.replaceChildren();for(const g of view){const card=document.createElement('article');const img=document.createElement('img');img.loading='lazy';img.decoding='async';img.alt=g.title||'Curu Pro Game';img.src=g.thumbnail||'assets/curu-games-logo.webp';img.onerror=()=>{img.onerror=null;img.src='assets/curu-games-logo.webp'};const d=document.createElement('div'),b=document.createElement('b'),sm=document.createElement('small'),actions=document.createElement('div'),a=document.createElement('a');b.textContent=g.title||'Pro Game';sm.textContent=g.category_en||g.category||'Pro Game';actions.className='play-card';a.href=PLAY;a.target='_blank';a.rel='noopener';a.textContent='Play in app →';actions.append(a);d.append(b,sm,actions);card.append(img,d);grid.append(card)}if(more){more.hidden=view.length>=rows.length;more.textContent=`Show more games${rows.length>view.length?` (${rows.length-view.length})`:''}`}qsa('[data-pro-count]').forEach(el=>text(el,rows.length||all.length))}
async function loadPro(){if(!qs('#proGamesSection')&&!qs('#proGrid'))return;try{const r=await fetch(`${API}/api/games/pro/showcase?limit=120`,{mode:'cors',credentials:'omit'});if(!r.ok)return;const j=await r.json();const enabled=j.enabled!==false;const rows=Array.isArray(j.games)?j.games:Array.isArray(j.items)?j.items:Array.isArray(j.catalog)?j.catalog:[];if(!enabled||!rows.length)return;all=rows.filter(g=>g&&g.title);qs('#proGamesSection')?.removeAttribute('hidden');categories();render()}catch(_){}}
qs('#proSearch')?.addEventListener('input',()=>{shown=12;render()});
qs('#proCategory')?.addEventListener('change',()=>{shown=12;render()});
qs('#showMoreGames')?.addEventListener('click',()=>{shown+=12;render()});


// v7: Rotate real Curu Shop post images in the PRINT journey card.
const printPosts=[
  'assets/media/shiva-statue.webp',
  'assets/media/radha-krishna.webp',
  'assets/media/krishna-post.webp',
  'assets/media/batman-post.webp',
  'assets/media/durga-statue.webp',
  'assets/media/hanuman-statue.webp'
];
qsa('[data-print-rotator]').forEach(rotator=>{
  const img=rotator.querySelector('.print-rotator-image');
  if(!img)return;
  let current=Math.max(0,printPosts.indexOf(img.getAttribute('src')));
  printPosts.forEach(src=>{const preload=new Image();preload.src=src});
  const next=()=>{
    let candidate=current;
    while(candidate===current&&printPosts.length>1)candidate=Math.floor(Math.random()*printPosts.length);
    current=candidate;
    rotator.classList.add('is-changing');
    window.setTimeout(()=>{
      img.src=printPosts[current];
      img.alt='A real 3D printed creation from The Curu Shop';
      img.addEventListener('load',()=>rotator.classList.remove('is-changing'),{once:true});
      window.setTimeout(()=>rotator.classList.remove('is-changing'),650);
    },180);
  };
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)window.setInterval(next,3000);
});

// v7: Clean reel interaction: hover preview on desktop; click locks playback.
const canHover=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
qsa('.reel-card video').forEach(video=>{
  video.removeAttribute('controls');
  video.controls=false;
  video.muted=true;
  video.playsInline=true;
  const shell=document.createElement('div');
  shell.className='video-shell';
  video.parentNode.insertBefore(shell,video);
  shell.appendChild(video);
  const play=document.createElement('button');
  play.type='button';play.className='video-play';play.setAttribute('aria-label','Play video');
  const controls=document.createElement('div');controls.className='video-mini-controls';
  const stop=document.createElement('button');stop.type='button';stop.className='video-control video-stop';stop.textContent='■ Stop';stop.setAttribute('aria-label','Stop video');
  const sound=document.createElement('button');sound.type='button';sound.className='video-control video-sound';sound.textContent='🔇 Sound';sound.setAttribute('aria-label','Turn sound on');
  controls.append(stop,sound);shell.append(play,controls);
  let locked=false;
  const reset=()=>{locked=false;video.pause();try{video.currentTime=0}catch(_){}video.muted=true;shell.classList.remove('is-playing','is-previewing');sound.textContent='🔇 Sound';sound.setAttribute('aria-label','Turn sound on')};
  const lockPlay=()=>{locked=true;video.muted=false;shell.classList.remove('is-previewing');shell.classList.add('is-playing');sound.textContent='🔊 Mute';sound.setAttribute('aria-label','Mute video');video.play().catch(()=>{video.muted=true;sound.textContent='🔇 Sound';sound.setAttribute('aria-label','Turn sound on');video.play().catch(()=>{})})};
  play.addEventListener('click',e=>{e.stopPropagation();lockPlay()});
  shell.addEventListener('click',e=>{if(e.target.closest('.video-control')||e.target.closest('.video-play'))return;if(!locked)lockPlay()});
  stop.addEventListener('click',e=>{e.stopPropagation();reset()});
  sound.addEventListener('click',e=>{e.stopPropagation();video.muted=!video.muted;sound.textContent=video.muted?'🔇 Sound':'🔊 Mute';sound.setAttribute('aria-label',video.muted?'Turn sound on':'Mute video')});
  video.addEventListener('ended',reset);
  if(canHover){
    shell.addEventListener('mouseenter',()=>{if(locked)return;video.muted=true;shell.classList.add('is-previewing');video.play().catch(()=>shell.classList.remove('is-previewing'))});
    shell.addEventListener('mouseleave',()=>{if(locked)return;video.pause();try{video.currentTime=0}catch(_){}shell.classList.remove('is-previewing')});
  }
});

loadConfig();loadPro();
})();
