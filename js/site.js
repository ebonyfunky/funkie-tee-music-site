(function(){
  // Catalogue is injected at build time (tools/build.py): slug, name, audio, cover, yt, sp, apple, am
  var SONGS=[{"slug":"god-did-it","name":"God Did It","audio":"god-did-it","cover":"img/cv/god-did-it.jpg","yt":"https://www.youtube.com/watch?v=jnyfwOIjw3c","sp":"https://open.spotify.com/track/3BAfG6dZxP5Ydbwav6AU3O","apple":"https://music.apple.com/us/album/god-did-it/6811753024?i=6811753535","am":"https://music.amazon.ca/albums/B0HJPTW15M"},{"slug":"my-fathers-plans-for-me-remix","name":"My Father's Plans for Me (Remix)","audio":"my-fathers-plans-for-me-remix","cover":"img/cv/my-fathers-plans-for-me-remix.jpg","yt":"https://www.youtube.com/watch?v=tt5kdEgY1FI","sp":"https://open.spotify.com/album/1W52Qmn7nJIkMdbftYn73d","apple":"https://music.apple.com/us/album/my-fathers-plans-for-me-remix/6819094839?i=6819094840","am":"https://music.amazon.ca/artists/B0GFKVNXMG"},{"slug":"streams-of-joy","name":"Streams of Joy","audio":"streams-of-joy","cover":"img/cv/this-is-my-jubilee.jpg","yt":"https://www.youtube.com/watch?v=ZLsl9BLj8iQ","sp":"https://open.spotify.com/track/2vslhYYccxakUEcilEmjza","apple":"https://music.apple.com/us/album/streams-of-joy/1892508185?i=1892508186","am":"https://music.amazon.ca/albums/B0GWP56MLY"},{"slug":"opemipo","name":"Opemipo","audio":"opemipo","cover":"img/cv/this-is-my-jubilee.jpg","yt":"https://www.youtube.com/watch?v=ZtKf0Vg5AOo","sp":"https://open.spotify.com/track/2unVaGgtbcvHeebfj5EcAI","apple":"https://music.apple.com/us/album/opemipo/1892508185?i=1892508188","am":"https://music.amazon.ca/albums/B0GWP56MLY"},{"slug":"its-not-over-for-me","name":"It's Not Over for Me","audio":"its-not-over","cover":"img/cv/this-is-my-jubilee.jpg","yt":"https://www.youtube.com/watch?v=rSNhOOLS7S8","sp":"https://open.spotify.com/track/1O4rcaFprqFdpLiAzd7b89","apple":"https://music.apple.com/us/album/its-not-over-for-me/1892508185?i=1892508339","am":"https://music.amazon.ca/albums/B0GWP56MLY"},{"slug":"ebenezer","name":"Ebenezer","audio":"ebenezer","cover":"img/cv/this-is-my-jubilee.jpg","yt":"https://www.youtube.com/watch?v=SQhjYVacWhc","sp":"https://open.spotify.com/track/1Yfkz0zsDBCEi4hYoMQ3I6","apple":"https://music.apple.com/us/album/ebenezer/1892508185?i=1892508340","am":"https://music.amazon.ca/albums/B0GWP56MLY"},{"slug":"the-blood-of-jesus","name":"The Blood of Jesus","audio":"the-blood-of-jesus","cover":"img/cv/this-is-my-jubilee.jpg","yt":"https://www.youtube.com/watch?v=KdMxvjaxvCo","sp":"https://open.spotify.com/track/7lKMg5dX03eMVAo2daqg4Q","apple":"https://music.apple.com/us/album/the-blood-of-jesus/1892508185?i=1892508341","am":"https://music.amazon.ca/albums/B0GWP56MLY"},{"slug":"christ-is-enough-for-me","name":"Christ is Enough for Me","audio":"christ-is-enough","cover":"img/cv/this-is-my-jubilee.jpg","yt":"https://www.youtube.com/watch?v=P5xjOlPnFlc","sp":"https://open.spotify.com/track/3PMrEvkJhXj6uDvZUgK4wt","apple":"https://music.apple.com/us/album/christ-is-enough-for-me/1892508185?i=1892508342","am":"https://music.amazon.ca/albums/B0GWP56MLY"},{"slug":"this-is-my-jubilee","name":"This is My Jubilee","audio":"this-is-my-jubilee","cover":"img/cv/this-is-my-jubilee.jpg","yt":"https://www.youtube.com/watch?v=ODlC7JhlicA","sp":"https://open.spotify.com/track/4q9wao5v9ClELkNlga44aM","apple":"https://music.apple.com/us/album/this-is-my-jubilee/1892508185?i=1892508343","am":"https://music.amazon.ca/albums/B0GWP56MLY"},{"slug":"last-dance","name":"Last Dance","audio":"last-dance","cover":"img/cv/last-dance.jpg","yt":"https://www.youtube.com/watch?v=6CByZ2Kxt6Q","sp":"https://open.spotify.com/track/6kKhU4l1R32WRZn9G56jg8","apple":"https://music.apple.com/us/album/last-dance/6777021020?i=6777021021","am":"https://music.amazon.ca/albums/B0H446TH9S"},{"slug":"i-shall-not-want","name":"I Shall Not Want","audio":"i-shall-not-want","cover":"img/cv/last-dance.jpg","yt":"https://www.youtube.com/watch?v=ujAJvnErskE","sp":"https://open.spotify.com/track/7Io776WnFHppqYfJn5nBLx","apple":"https://music.apple.com/us/album/i-shall-not-want/6777021020?i=6777021022","am":"https://music.amazon.ca/albums/B0H446TH9S"},{"slug":"take-the-praise","name":"Take The Praise","audio":"take-the-praise","cover":"img/cv/last-dance.jpg","yt":"https://www.youtube.com/watch?v=pwVRElXzdYg","sp":"https://open.spotify.com/track/29l9hnbw2bNMSJwdriXuwH","apple":"https://music.apple.com/us/album/take-the-praise/6777021020?i=6777021023","am":"https://music.amazon.ca/albums/B0H446TH9S"},{"slug":"rapha","name":"Rapha","audio":"rapha","cover":"img/cv/last-dance.jpg","yt":"https://www.youtube.com/watch?v=eKrR7AC9Myc","sp":"https://open.spotify.com/track/1mpP3uWDX4c9HFhyvrEOeA","apple":"https://music.apple.com/us/album/rapha/6777021020?i=6777021024","am":"https://music.amazon.ca/albums/B0H446TH9S"},{"slug":"this-jesus-is-different","name":"This Jesus is Different","audio":"this-jesus-is-different","cover":"img/cv/last-dance.jpg","yt":"https://www.youtube.com/watch?v=_r-bfaca9xo","sp":"https://open.spotify.com/track/3NFcuJ3yyulQtBTh6M6KZc","apple":"https://music.apple.com/us/album/this-jesus-is-different/6777021020?i=6777021025","am":"https://music.amazon.ca/albums/B0H446TH9S"},{"slug":"theres-prophecy-over-me","name":"There's Prophecy Over Me","audio":"theres-prophecy-over-me","cover":"img/cv/last-dance.jpg","yt":"https://www.youtube.com/watch?v=khrubZGy0Zk","sp":"https://open.spotify.com/track/5a6Td5tkN6LkjOZQWkwSyd","apple":"https://music.apple.com/us/album/theres-prophecy-over-me/6777021020?i=6777021207","am":"https://music.amazon.ca/albums/B0H446TH9S"},{"slug":"just-your-voice","name":"Just Your Voice","audio":"just-your-voice","cover":"img/cv/last-dance.jpg","yt":"https://www.youtube.com/watch?v=A40G8Z3KEhc","sp":"https://open.spotify.com/track/5Gfd406COf8qDQs2MnNZio","apple":"https://music.apple.com/us/album/just-your-voice/6777021020?i=6777021208","am":"https://music.amazon.ca/albums/B0H446TH9S"},{"slug":"nothing-missing-nothing-broken","name":"Nothing Missing, Nothing Broken","audio":"nothing-missing-nothing-broken","cover":"img/cv/nothing-missing-nothing-broken.jpg","yt":"https://www.youtube.com/watch?v=RtqrzCLbOb8","sp":"https://open.spotify.com/track/6XmMS2k7gHKerhkykbhxDz","apple":"https://music.apple.com/us/album/nothing-missing-nothing-broken/1882712373?i=1882712374","am":"https://music.amazon.ca/albums/B0GR8TNYBL"},{"slug":"come-and-see","name":"Come and See","audio":"come-and-see","cover":"img/cv/come-and-see.jpg","yt":"https://www.youtube.com/results?search_query=Funkie%20Tee%20Come%20and%20See","sp":"https://open.spotify.com/album/4IKwcTVqO7R7LlImSNysno","apple":"https://music.apple.com/us/album/come-and-see/1878952934?i=1878952935","am":"https://music.amazon.ca/albums/B0GNYZT9SZ"},{"slug":"great-and-mighty-god","name":"Great and Mighty God","audio":"great-and-mighty-god","cover":"img/cv/great-and-mighty-god.jpg","yt":"https://www.youtube.com/watch?v=b0FApMBq4No","sp":"https://open.spotify.com/album/1UDJvSHBWCjKMHCNVGKLz3","apple":"https://music.apple.com/us/album/great-and-mighty-god/1876587244?i=1876587245","am":"https://music.amazon.ca/albums/B0GMQ4V9RM"},{"slug":"apple-of-gods-eyes","name":"Apple of God's Eyes","audio":"apple-of-gods-eyes","cover":"img/cv/apple-of-gods-eyes.jpg","yt":"https://www.youtube.com/watch?v=KBpa7-DTzvM","sp":"https://open.spotify.com/album/6skKo3DuGrSNhK41pXdMI6","apple":"https://music.apple.com/us/album/apple-of-gods-eyes/1872059897?i=1872059898","am":"https://music.amazon.ca/albums/B0GJQM4VXX"},{"slug":"el-roi-you-see-me","name":"El-Roi (You See Me)","audio":"el-roi-you-see-me","cover":"img/cv/el-roi-you-see-me.jpg","yt":"https://www.youtube.com/watch?v=vPvw6wyyqkc","sp":"https://open.spotify.com/album/24EBa6fN4jtJBKXmbAMhNz","apple":"https://music.apple.com/us/album/el-roi-you-see-me/1871441251?i=1871441252","am":"https://music.amazon.ca/albums/B0GJ6YL49B"},{"slug":"for-who-you-are","name":"For Who You Are","audio":"for-who-you-are","cover":"img/cv/for-who-you-are.jpg","yt":"https://www.youtube.com/watch?v=2gA7b8HQSJo","sp":"https://open.spotify.com/album/5Bi8h2Z80n5ZJlvM0Rvy9S","apple":"https://music.apple.com/us/album/for-who-you-are/1871140283?i=1871140284","am":"https://music.amazon.ca/artists/B0GFKVNXMG"},{"slug":"i-declare","name":"I Declare","audio":"i-declare","cover":"img/cv/i-declare.jpg","yt":"https://www.youtube.com/watch?v=cQY7DL0_xZA","sp":"https://open.spotify.com/album/4T2IgDbz3ZE2SYPwik6dwv","apple":"https://music.apple.com/us/album/i-declare/1870186729?i=1870186730","am":"https://music.amazon.ca/artists/B0GFKVNXMG"},{"slug":"a-basket-of-goodies","name":"A Basket of Goodies","audio":"a-basket-of-goodies","cover":"img/cv/a-basket-of-goodies.jpg","yt":"https://www.youtube.com/watch?v=mOnHxDej2jI","sp":"https://open.spotify.com/album/3LDIWfB9E64Av2qapVcmap","apple":"https://music.apple.com/us/album/a-basket-of-goodies/1868577378?i=1868577379","am":"https://music.amazon.ca/artists/B0GFKVNXMG"},{"slug":"my-fathers-plans-for-me","name":"My Father's Plans For Me","audio":"my-fathers-plans-for-me","cover":"img/cv/my-fathers-plans-for-me.jpg","yt":"https://www.youtube.com/watch?v=eF5pqTqbDN0","sp":"https://open.spotify.com/album/0dFYoKZ1iSRfu8H3HcNB4P","apple":"https://music.apple.com/us/album/my-fathers-plans-for-me/1867908155?i=1867908157","am":"https://music.amazon.ca/artists/B0GFKVNXMG"},{"slug":"new-thing","name":"New Thing","audio":"new-thing","cover":"img/cv/new-thing.jpg","yt":"https://www.youtube.com/watch?v=sQZP6BmwSYo","sp":"https://open.spotify.com/album/22XFztOfhkKGnUp5p6mnXU","apple":"https://music.apple.com/us/album/new-thing/1867400771?i=1867400772","am":"https://music.amazon.ca/artists/B0GFKVNXMG"}];
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
