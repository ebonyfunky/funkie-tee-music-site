(function(){
  // Catalogue is injected at build time (tools/build.py): slug, name, audio, cover, yt, sp, apple, am
  var SONGS=/*SONGS*/[];
  var pre=document.documentElement.dataset.root||'';

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
      document.getElementById('p-yt').href=s.yt;document.getElementById('p-sp').href=s.sp;
      document.getElementById('p-ap').href=s.apple;document.getElementById('p-am').href=s.am;
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
    a.addEventListener('ended',function(){load(cur+1)});
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
})();
