(function(){
  // Catalogue is injected at build time (tools/build.py): slug, name, audio, cover, yt, sp, apple, am
  var SONGS=/*SONGS*/[];
  var pre=document.documentElement.dataset.root||'';

  // Hero: a slow parallax on the portrait while the page scrolls (desktop only, never with reduced motion)
  var heroImg=document.querySelector('.hero-bg img');
  if(heroImg&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&matchMedia('(min-width: 821px)').matches){
    var ticking=false;
    function par(){var y=Math.min(scrollY,900);heroImg.style.setProperty('--py',(y*0.16)+'px');ticking=false}
    addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(par);ticking=true}},{passive:true});par();
  }

  // Phone menu
  var head=document.getElementById('site-head'),mb=document.getElementById('menu-btn');
  if(mb){
    mb.addEventListener('click',function(){var o=head.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
    [].forEach.call(document.querySelectorAll('#navlinks a'),function(l){l.addEventListener('click',function(){head.classList.remove('open');mb.setAttribute('aria-expanded','false')})});
  }

  // Preview player: one audio element, the whole catalogue is the playlist
  var a=document.getElementById('audio'),P=document.getElementById('player');
  if(a&&P){
    var fill=document.getElementById('p-fill'),bar=document.getElementById('p-bar'),cur=-1;
    var rows=[].slice.call(document.querySelectorAll('.songs li[data-song]'));
    function idx(slug){for(var i=0;i<SONGS.length;i++)if(SONGS[i].slug===slug)return i;return -1}
    function mark(){
      var slug=cur<0?'':SONGS[cur].slug;
      rows.forEach(function(r){var on=r.dataset.song===slug;r.classList.toggle('on',on);r.classList.toggle('playing',on&&!a.paused)});
      P.classList.toggle('playing',!a.paused);
    }
    function load(i){
      cur=(i+SONGS.length)%SONGS.length;var s=SONGS[cur];
      a.src=pre+'audio/'+s.audio+'.m4a';
      document.getElementById('p-title').textContent=s.name;
      document.getElementById('p-cover').src=pre+s.cover;
      [['p-yt',s.yt],['p-sp',s.sp],['p-ap',s.apple],['p-am',s.am]].forEach(function(l){var el=document.getElementById(l[0]);var ok=l[1]&&l[1]!=='#';el.hidden=!ok;if(ok)el.href=l[1]});
      P.hidden=false;document.body.classList.add('has-player');
      a.play().catch(function(){});mark();
    }
    function toggle(i){if(i<0)return;if(i===cur){a.paused?a.play().catch(function(){}):a.pause()}else load(i)}
    rows.forEach(function(r){r.querySelector('.pl').addEventListener('click',function(){toggle(idx(r.dataset.song))})});
    [].forEach.call(document.querySelectorAll('[data-play]'),function(b){b.addEventListener('click',function(){toggle(idx(b.dataset.play))})});
    document.getElementById('p-pp').onclick=function(){if(cur<0)load(0);else toggle(cur)};
    document.getElementById('p-next').onclick=function(){load(cur+1)};
    document.getElementById('p-prev').onclick=function(){load(cur-1)};
    document.getElementById('p-close').onclick=function(){a.pause();P.hidden=true;document.body.classList.remove('has-player');cur=-1;mark()};
    bar.onclick=function(e){if(a.duration){var b=bar.getBoundingClientRect();a.currentTime=a.duration*(e.clientX-b.left)/b.width}};
    bar.onkeydown=function(e){if(!a.duration)return;if(e.key==='ArrowRight')a.currentTime=Math.min(a.duration,a.currentTime+3);if(e.key==='ArrowLeft')a.currentTime=Math.max(0,a.currentTime-3)};
    a.addEventListener('timeupdate',function(){var p=a.duration?a.currentTime/a.duration*100:0;fill.style.width=p+'%';bar.setAttribute('aria-valuenow',Math.round(p))});
    ['play','pause'].forEach(function(ev){a.addEventListener(ev,mark)});
    // Radio: a shuffled, continuous mix of every preview
    var radio=false,order=[],rpos=0,rb=document.getElementById('stereo-btn'),rt=document.getElementById('radio-title'),rf=document.getElementById('radio-full'),onair=document.getElementById('onair');
    function shuffle(){order=SONGS.map(function(_,i){return i});for(var i=order.length-1;i>0;i--){var k=Math.floor(Math.random()*(i+1)),x=order[i];order[i]=order[k];order[k]=x}rpos=0}
    function radioUI(){var on=radio&&!a.paused;if(rb){rb.setAttribute('aria-pressed',on);rb.classList.toggle('on',on);rb.classList.toggle('armed',radio);rb.querySelector('.full').textContent=on?'On air':(radio?'Stereo paused':'Turn on the stereo')}var ps=document.querySelector('.player .sub');if(ps)ps.firstChild.nodeValue=radio?'Funkie Tee Radio · 30-second mix':'30-second preview'}
    function radioNext(){rpos=(rpos+1)%order.length;if(rpos===0)shuffle();load(order[rpos])}
    if(rb){rb.addEventListener('click',function(){
      if(!radio){radio=true;shuffle();load(order[0])}
      else if(a.paused){a.play().catch(function(){})}else{a.pause()}
      radioUI();
    })}
    a.addEventListener('ended',function(){if(radio)radioNext();else load(cur+1)});
    ['play','pause'].forEach(function(ev){a.addEventListener(ev,radioUI)});
    rows.forEach(function(r){r.querySelector('.pl').addEventListener('click',function(){radio=false;radioUI()})});
    [].forEach.call(document.querySelectorAll('[data-play]'),function(b){b.addEventListener('click',function(){radio=false;radioUI()})});
    document.getElementById('p-next').addEventListener('click',function(){if(radio){radioNext();radioUI()}});
    document.getElementById('p-close').addEventListener('click',function(){radio=false;radioUI()});
  }

  // Release switch: before the premiere the page shows the preview film; from the premiere it shows the YouTube video
  var filmBox=document.getElementById('film'),ytBox=document.getElementById('ytfilm');
  if(filmBox&&ytBox&&filmBox.dataset.release){
    var live=Date.now()>=Date.parse(filmBox.dataset.release);
    var cap=document.getElementById('vcap-title'),lnk=document.getElementById('vcap-link');
    if(live){filmBox.hidden=true;ytBox.hidden=false;if(cap)cap.textContent='Official music video';if(lnk)lnk.textContent='Watch on YouTube';var h=document.querySelector('#video h2'),ey=document.querySelector('#video .eyebrow');if(h)h.textContent='God Did It, the official video';if(ey)ey.textContent='Watch'}
    else{if(cap)cap.textContent='Official video premieres 1 October, 1:00 PM CT';if(lnk)lnk.textContent='Watch the music video'}
  }

  // Film: plays silently while it is on screen; one tap restarts it with sound
  var film=document.getElementById('film');
  if(film){
    var fv=film.querySelector('video'),fb=document.getElementById('film-btn'),sound=false;
    var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if('IntersectionObserver' in window&&!still){
      new IntersectionObserver(function(en){en.forEach(function(x){
        if(sound)return;
        if(x.isIntersecting)fv.play().catch(function(){});else fv.pause();
      })},{threshold:.35}).observe(film);
    }
    fb.addEventListener('click',function(){
      sound=true;if(a)a.pause();
      fv.muted=false;fv.loop=false;fv.controls=true;fv.currentTime=0;fv.play().catch(function(){});
      fb.hidden=true;
    });
  }

  // Video: a still image until the visitor asks for it, then the YouTube player
  [].forEach.call(document.querySelectorAll('.video[data-yt]'),function(v){
    v.addEventListener('click',function(){
      if(a)a.pause();
      var f=document.createElement('iframe');
      f.src='https://www.youtube-nocookie.com/embed/'+v.dataset.yt+'?autoplay=1&rel=0';
      f.title=v.dataset.title||'Video';f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;
      var box=document.createElement('div');box.className='video';box.appendChild(f);
      v.parentNode.replaceChild(box,v);
    });
  });
  // Next release: on release day the pre-save card becomes an "out now" card
  (function(){var n=document.getElementById('next');if(!n||!n.dataset.release)return;
    if(Date.now()>=new Date(n.dataset.release).getTime()){var e=document.getElementById('next-eyebrow'),b=document.getElementById('next-btn');if(e)e.textContent='Out now · New single';if(b){b.textContent='Listen now';var c=n.querySelector('.cover');if(c)c.setAttribute('aria-label','Listen to I Have Escaped')}}
  })();
})();
