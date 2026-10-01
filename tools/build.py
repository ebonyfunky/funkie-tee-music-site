#!/usr/bin/env python3
"""Builds index.html, music.html and js/site.js from data/catalogue.json.
Run from the site root:  python3 tools/build.py
Edit copy here, not in the generated HTML."""
import json, html, re, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
cat = json.load(open('data/catalogue.json'))
IC = json.load(open('data/icons.json'))
REL = {r['id']: r for r in cat['releases']}
SONGS = cat['songs']
e = html.escape
V = "49"  # bump to refresh cached css/js

SITE = 'https://www.funkieteemusic.com/'
YT = 'https://www.youtube.com/@Funkieteemusic'
YT_SUB = YT + '?sub_confirmation=1'
SP = 'https://open.spotify.com/artist/38PxBexr2CgpQjC7OwSqL5'
AP = 'https://music.apple.com/us/artist/funkie-tee/1867356216'
AM = 'https://music.amazon.ca/artists/B0GFKVNXMG'
IG = 'https://www.instagram.com/funkieteemusic'
TT = 'https://www.tiktok.com/@funkieteemusic'
FB = 'https://www.facebook.com/funkieteemusic'
CREDIT = 'Every song is written and creatively directed by Funkie Tee, with AI&#8209;assisted vocals and production.'  # non-breaking hyphen so AI-assisted never splits
PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'
PP = '<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>'


def ext(href, label, cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<a{c} href="{e(href)}" target="_blank" rel="noopener">{label}</a>'


def four(y, s, a, m, cls='plats', amazon='Amazon'):
    return f'<span class="{cls}">' + ext(y, 'YouTube') + ext(s, 'Spotify') + ext(a, 'Apple Music') + ext(m, amazon) + '</span>'


def head(title, desc, path, og_title):
    url = SITE + path
    ld = {"@context": "https://schema.org", "@type": "MusicGroup", "name": "Funkie Tee", "url": SITE,
          "image": SITE + "img/hero-wide.jpg",
          "description": "African contemporary gospel songwriter and creative artist.",
          "genre": ["Contemporary gospel", "African contemporary Christian", "Praise and worship", "Children's music"],
          "sameAs": [YT, SP, AP, AM, IG, TT, FB]}
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Funkie Tee Music">
<meta property="og:title" content="{e(og_title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}img/share.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0C1544">
<script type="application/ld+json">{json.dumps(ld)}</script>
<link rel="icon" type="image/png" href="favicon.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Karla:wght@400;600;700;800&family=Pinyon+Script&family=Playfair+Display:wght@800;900&display=swap">
<link rel="stylesheet" href="css/site.css?v={V}">
</head>
<body>
<a class="skiplink" href="#main">Skip to content</a>
'''


def header(page):
    home = '' if page == 'home' else 'index.html'
    cur = lambda p: ' aria-current="page"' if p == page else ''
    return f'''<header class="site-head" id="site-head">
  <div class="wrap">
    <a class="brand" href="{home or '#top'}"><img src="img/emblem-sm.png" alt="" width="44" height="44"><span class="bname">Funkie <em>Tee</em></span></a>
    <button class="menu-btn" type="button" id="menu-btn" aria-expanded="false" aria-controls="navlinks">Menu</button>
    <nav class="links" id="navlinks" aria-label="Main">
      <a href="{home or '#top'}"{cur('home')}>Home</a>
      <a href="music.html"{cur('music')}>Music</a>
      <a href="podcast.html"{cur('podcast')}>Podcast</a>
      <a href="{home}#about">About</a>
      <a href="{home}#kids">Kids Zone</a>
      <a href="{home}#follow">Connect</a>
    </nav>
    <button class="stereo" type="button" id="stereo-btn" aria-pressed="false" aria-label="Turn on the stereo: play a continuous mix of Funkie Tee songs"><span class="dot"></span><svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg><span class="full">Turn on the stereo</span><span class="short">Stereo</span></button>
    <div class="head-social">
      <a href="{YT_SUB}" target="_blank" rel="noopener" aria-label="Subscribe to Funkie Tee on YouTube">{IC['yt']}</a>
      <a href="{TT}" target="_blank" rel="noopener" aria-label="Funkie Tee on TikTok">{IC['tt']}</a>
      <a href="{IG}" target="_blank" rel="noopener" aria-label="Funkie Tee on Instagram">{IC['ig']}</a>
    </div>
  </div>
</header>
'''


def footer():
    return f'''<footer>
  <div class="wrap">
    <span>© 2026 Funkie Tee Music · Charlen Legacy Records</span>
    <span class="made">{CREDIT}</span>
  </div>
</footer>

<div class="player" id="player" hidden>
  <img class="cv" id="p-cover" src="img/cv/god-did-it.jpg" alt="" width="52" height="52">
  <div class="info"><div class="ttl" id="p-title">God Did It</div><div class="sub">30-second preview<a id="p-yt" href="{e(SONGS[0]['yt'])}" target="_blank" rel="noopener">YouTube</a><a id="p-sp" href="{e(SONGS[0]['sp'])}" target="_blank" rel="noopener">Spotify</a><a id="p-ap" href="{e(SONGS[0]['apple'])}" target="_blank" rel="noopener">Apple Music</a><a id="p-am" href="{e(SONGS[0]['am'])}" target="_blank" rel="noopener">Amazon</a></div></div>
  <div class="ctl">
    <button class="skip" type="button" id="p-prev" aria-label="Previous song"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg></button>
    <button class="pp" type="button" id="p-pp" aria-label="Play or pause">{PP}</button>
    <button class="skip" type="button" id="p-next" aria-label="Next song"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg></button>
    <button type="button" id="p-close" aria-label="Close player"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6z"/></svg></button>
  </div>
  <div class="bar" id="p-bar" role="slider" aria-label="Preview progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><i id="p-fill"></i></div>
</div>
<audio id="audio" preload="none"></audio>
<script src="js/site.js?v={V}" defer></script>
</body>
</html>
'''


def song(slug):
    return next(s for s in SONGS if s['slug'] == slug)


def release(name):
    return next(r for r in cat['releases'] if r['name'] == name)


GDI = song('god-did-it')
KIDS = sorted([r for r in cat['releases'] if r['kind'] == 'kids'], key=lambda r: r['name'])


def kids_vols():
    out = []
    for r in KIDS:
        n = re.search(r'Vol\. (\d)', r['name']).group(1)
        t = r['name'].split(': ')[1]
        out.append(f'''      <div class="vol">
        <a class="cover" href="{e(r['yt'])}" target="_blank" rel="noopener" aria-label="Listen to {e(r['name'])} on YouTube"><img src="{r['cover']}" alt="{e(r['name'])} album cover" width="900" height="900" loading="lazy"></a>
        <span class="kind">Vol. {n} · {r['count']} songs</span>
        <h3>{e(t)}</h3>
        {four(r['yt'], r['sp'], r['apple'], r['am'], 'also')}
      </div>''')
    return '\n'.join(out)


# ------------------------------------------------------------------ HOME
# One-liners below the titles. Drafted from the titles and their Scripture; Funkie to confirm each.
PICKS = [
    ('This is My Jubilee', 'Album · 7 songs', "Seven songs of thanksgiving, celebration and faith, created for Funkie Tee's Ruby Jubilee."),
    ('Last Dance', 'Album · 7 songs', 'Seven songs of worship, healing and trust.'),
    ('El-Roi (You See Me)', 'Single', 'For the one who feels unseen. He sees you.'),
    ("My Father's Plans For Me", 'Single', 'When you cannot see the road, His plans still stand.'),
    ('A Basket of Goodies', 'Single', 'Every good gift comes from above. A song of thanks for His goodness.'),
]


def picks():
    out = []
    for name, kind, line in PICKS:
        r = next((x for x in cat['releases'] if x['name'] == name), None)
        if r is None:  # a song from an album, not a release of its own
            s = next(x for x in SONGS if x['name'] == name)
            r = {'cover': s['cover'], 'lead': s['slug']}
        out.append(f'''      <li>
        <img src="{r['cover']}" alt="{e(name)} cover" width="900" height="900" loading="lazy">
        <div><h3>{e(name)}</h3><span class="kind">{kind}</span></div>
        <p class="line">{e(line)}</p>
        <button class="playlink" type="button" data-play="{r['lead']}" aria-label="Listen to a preview of {e(name)}"><i>{PLAY}</i>Listen</button>
      </li>''')
    return '\n'.join(out)


home = head('Funkie Tee | Contemporary Gospel Music',
            'Contemporary gospel music by Funkie Tee — songs of faith, testimony, worship and hope, plus Scripture music for children, families and choirs.',
            '', 'Funkie Tee | Contemporary Gospel Music') + header('home') + f'''
<main id="main">
<section class="hero hero-wide" id="top" style="padding-block:0">
  <picture class="hero-bg"><source media="(max-width:820px)" srcset="img/hero-tall.jpg?v=3"><img src="img/hero-wide.jpg?v=2" alt="Funkie Tee in a gold beaded gown beside a window over a city at dusk" width="2000" height="1125" fetchpriority="high"></picture>
  <div class="hero-light" aria-hidden="true"><i class="gold"></i><i class="teal"></i></div>
  <div class="wrap">
    <div class="hero-copy">
      <span class="eyebrow">African contemporary gospel</span>
      <h1>FUNKIE TEE</h1>
      <p class="tagline">Where Faith Meets the Future</p>
      <p class="statement">Music for the waiting season.<br>Music for the victory.<br>Songs that point hearts to God.</p>
      <p class="support">Funkie Tee is an African contemporary gospel songwriter creating music of faith, testimony and hope — alongside Scripture songs for children, families and choirs.</p>
      <div class="row">
        <a class="btn btn-gold" href="music.html">Listen now</a>
        <a class="btn btn-line" href="#about">Discover Funkie Tee</a>
      </div>
      <button class="nowpill" type="button" data-play="god-did-it"><span class="np-tag">Out now</span><span class="np-title">God Did It</span><span class="np-play">{PLAY}Play</span></button>
    </div>
  </div>
</section>

<section class="on-ivory" id="latest">
  <div class="wrap feature">
    <div class="art"><img src="img/cv/god-did-it.jpg" alt="God Did It cover art: golden doors standing open" width="900" height="900" loading="lazy"></div>
    <div class="stack">
      <span class="eyebrow">Out now · Single</span>
      <h2>God Did It</h2>
      <p class="pitch">When the door was shut, He showed up. A testimony song for anyone who waited longer than they expected and still saw God move.</p>
      <blockquote>“This is the LORD's doing; it is marvellous in our eyes.”<cite>— Psalm 118:23</cite></blockquote>
      <div class="row">
        <button class="btn btn-ink" type="button" data-play="god-did-it">{PLAY}Listen now</button>
        <a class="btn btn-line" href="#video">Watch video</a>
      </div>
      <p class="also"><span>Full song</span>{ext(GDI['yt'], 'YouTube')}{ext(GDI['sp'], 'Spotify')}{ext(GDI['apple'], 'Apple Music')}{ext(GDI['am'], 'Amazon Music')}</p>
    </div>
  </div>
</section>

<section class="on-indigo" id="music">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Selected music</span>
      <h2>Start here</h2>
    </div>
    <ul class="picks">
{picks()}
    </ul>
    <div class="row" style="margin-top:2.6rem">
      <a class="btn btn-gold" href="music.html">Explore music</a>
    </div>
  </div>
</section>

<section class="on-ivory" id="about">
  <div class="wrap about">
    <figure class="pair solo">
      <img class="big" src="img/portrait-about.jpg?v=5" alt="Funkie Tee standing in a navy gown with gold embroidery" width="1000" height="1500" loading="lazy">
    </figure>
    <div class="stack">
      <span class="eyebrow">The heart behind the music</span>
      <h2 class="voice">An African voice in contemporary gospel, creating songs of faith for a global generation.</h2>
      <p>Funkie Tee has been singing in choirs since she was six, and faith has been at the centre of her life and her music ever since. She writes from real experience, testimony, prayer and Scripture.</p>
      <p class="credit">{CREDIT}</p>
      <p>The songs begin with lived experience and faith. Technology helps bring them to life. The message, the testimony and the creative direction stay personal.</p>
      <blockquote>“My prayer is that you leave every song more certain of God than when you pressed play.”<cite>— Funkie Tee</cite></blockquote>
      <p class="closing">Written from faith. Brought to life with technology. Released for God's glory.</p>
    </div>
  </div>
</section>

<section class="kids" id="kids">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Kids Zone · Verse Vanish</span>
      <h2>Scripture songs for little voices</h2>
      <p class="lead">Bible truth made memorable through music for children, families, Sunday schools and children's choirs.</p>
      <p class="madefor">Made for families, churches, Christian schools, Sunday schools and children's choirs.</p>
    </div>
    <div class="vols">
{kids_vols()}
    </div>
    <p class="playline">Songs children can sing — and Scripture they can play.</p>
    <div class="row">
      <a class="btn btn-gold btn-big" href="https://charlenplay.com" target="_blank" rel="noopener">{PLAY}Play the Bible games</a>
      <a class="btn btn-teal" href="music.html#kids">Explore kids music</a>
    </div>
    <p class="playnote">Free to play · no sign-up, no ads</p>
  </div>
</section>

<section class="on-indigo" id="video">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Video preview</span>
      <h2>A first look at God Did It</h2>
    </div>
    <div class="video film" id="film" data-release="2026-10-01T13:00:00-05:00" data-yt="QLBroPtO5vY">
      <video muted loop playsinline preload="none" poster="img/video-god-did-it.jpg" width="1366" height="768" aria-label="God Did It, a short film: a woman in a rose dress in a glass-walled room above a city at dusk"><source src="video/god-did-it.mp4" type="video/mp4"></video>
      <button class="shade" type="button" id="film-btn" aria-label="Watch the God Did It video preview with sound"><span class="disc">{PLAY}</span><span class="lbl">Watch the preview</span></button>
    </div>
    <button class="video" id="ytfilm" type="button" data-yt="QLBroPtO5vY" data-title="God Did It (Official Music Video) by Funkie Tee" aria-label="Watch God Did It, the official music video" hidden>
      <img src="img/video-god-did-it.jpg" alt="" width="1366" height="768" loading="lazy">
      <span class="shade"><span class="disc">{PLAY}</span><span class="lbl">Watch video</span></span>
    </button>
    <div class="videocap"><b id="vcap-title">Official music video</b><a id="vcap-link" class="playlink" href="https://youtu.be/QLBroPtO5vY" target="_blank" rel="noopener">Watch the music video</a></div>
  </div>
</section>

<section class="on-ivory follow" id="follow">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Connect</span>
      <h2>Follow Funkie Tee</h2>
      <p class="lead">New songs and the stories behind them</p>
    </div>
    <a class="btn btn-gold btn-big subscribe" href="{YT_SUB}" target="_blank" rel="noopener">{IC['yt']}Subscribe on YouTube</a>
    <div class="socials">
      <a href="{SP}" target="_blank" rel="noopener">{IC['sp']}Spotify</a>
      <a href="{AP}" target="_blank" rel="noopener">{IC['ap']}Apple Music</a>
      <a href="{AM}" target="_blank" rel="noopener">{IC['am']}Amazon Music</a>
      <a href="{IG}" target="_blank" rel="noopener">{IC['ig']}Instagram</a>
      <a href="{TT}" target="_blank" rel="noopener">{IC['tt']}TikTok</a>
      <a href="{FB}" target="_blank" rel="noopener">{IC['fb']}Facebook</a>
    </div>
  </div>
</section>
</main>
''' + footer()


# ------------------------------------------------------------------ MUSIC PAGE
def rel_card(r):
    kind = 'Single' if r['kind'] == 'single' else f"Album · {r['count']} songs"
    lead = song(r['lead'])
    return f'''      <article class="rel">
        <button class="cover" type="button" data-play="{r['lead']}" aria-label="Play a preview of {e(lead['name'])}"><img src="{r['cover']}" alt="{e(r['name'])} cover" width="900" height="900" loading="lazy"><span class="go">{PLAY}</span></button>
        <h3>{e(r['name'])}</h3>
        <span class="kind">{kind}</span>
        {four(r['yt'], r['sp'], r['apple'], r['am'])}
      </article>'''


albums = [r for r in cat['releases'] if r['kind'] == 'album']
albums.sort(key=lambda r: r['date'], reverse=True)
singles = [r for r in cat['releases'] if r['kind'] == 'single']
singles.sort(key=lambda r: r['date'], reverse=True)


def rows():
    out = []
    for s in SONGS:
        new = ' <span class="newtag">New</span>' if s['slug'] == 'god-did-it' else ''
        out.append(f'''      <li data-song="{s['slug']}"><button class="pl" type="button" aria-label="Play a preview of {e(s['name'])}">{PP}</button><span class="body"><span class="t">{e(s['name'])}{new}</span>{four(s['yt'], s['sp'], s['apple'], s['am'])}</span><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span></li>''')
    return '\n'.join(out)


music = head('Music | Funkie Tee',
             'Every Funkie Tee release in one place: albums, singles and Scripture songs for children. Preview each song and open it on YouTube, Spotify, Apple Music or Amazon Music.',
             'music', 'Music | Funkie Tee') + header('music') + f'''
<main id="main">
<section class="pagehead" id="top">
  <div class="wrap">
    <span class="eyebrow">The catalogue</span>
    <h1>Music</h1>
    <p class="lead">Two albums, eleven singles and three albums of Scripture songs for children.</p>
    <nav class="subnav" aria-label="On this page">
      <a href="#latest">Latest release</a><a href="#albums">Albums</a><a href="#singles">Singles</a><a href="#songs">All songs</a><a href="#kids">Kids</a>
    </nav>
  </div>
</section>

<section class="on-ivory" id="latest">
  <div class="wrap feature">
    <div class="art"><img src="img/cv/god-did-it.jpg" alt="God Did It cover art: golden doors standing open" width="900" height="900"></div>
    <div class="stack">
      <span class="eyebrow">Latest release · Single</span>
      <h2>God Did It</h2>
      <p class="pitch">When the door was shut, He showed up. A testimony song for anyone who waited longer than they expected and still saw God move.</p>
      <div class="row">
        <button class="btn btn-ink" type="button" data-play="god-did-it">{PLAY}Listen now</button>
        {ext(GDI['yt'], 'Watch video', 'btn btn-line')}
      </div>
      <p class="also"><span>Full song</span>{ext(GDI['yt'], 'YouTube')}{ext(GDI['sp'], 'Spotify')}{ext(GDI['apple'], 'Apple Music')}{ext(GDI['am'], 'Amazon Music')}</p>
    </div>
  </div>
</section>

<section class="on-ivory" id="albums" style="padding-top:0">
  <div class="wrap">
    <div class="head"><span class="eyebrow">Albums</span><h2>Albums</h2></div>
    <div class="shelf two">
{chr(10).join(rel_card(r) for r in albums)}
    </div>
  </div>
</section>

<section class="on-ivory" id="singles" style="padding-top:0">
  <div class="wrap">
    <div class="head"><span class="eyebrow">Singles</span><h2>Singles</h2></div>
    <div class="shelf">
{chr(10).join(rel_card(r) for r in singles)}
    </div>
  </div>
</section>

<section class="on-indigo" id="songs">
  <div class="wrap">
    <div class="songhead">
      <div class="head" style="margin-bottom:0">
        <span class="eyebrow">All {len(SONGS)} songs</span>
        <h2>Press play</h2>
        <p class="lead">A 30-second preview of every song. Each one opens in full where you listen.</p>
      </div>
      <div class="anywhere">
        <b>Listen anywhere</b>
        <div class="aw-grid">{ext(YT, 'YouTube')}{ext(SP, 'Spotify')}{ext(AP, 'Apple Music')}{ext(AM, 'Amazon Music')}</div>
      </div>
    </div>
    <div class="songpanel">
    <ul class="songs">
{rows()}
    </ul>
    </div>
  </div>
</section>

<section class="kids" id="kids">
  <div class="wrap">
    <div class="head">
      <span class="eyebrow">Kids · Verse Vanish</span>
      <h2>Scripture songs for little voices</h2>
      <p class="lead">Three albums, 26 songs, one KJV verse per song. Made for children, families, Sunday schools and children's choirs.</p>
    </div>
    <div class="vols">
{kids_vols()}
    </div>
    <div class="row">
      <a class="btn btn-gold btn-big" href="https://charlenplay.com" target="_blank" rel="noopener">{PLAY}Play the Bible games</a>
      <a class="btn btn-line" href="{e(KIDS[0]['yt'])}" target="_blank" rel="noopener">Listen now</a>
    </div>
  </div>
</section>
</main>
''' + footer()


# ------------------------------------------------------------------ PODCAST
POD = json.load(open('data/podcast.json'))


def episodes():
    if not POD['episodes']:
        return '''      <li class="ep soon">
        <span class="kind">Episode 1</span>
        <h3>The first episode is on its way.</h3>
        <p>A few minutes of encouragement for the week ahead. Subscribe on YouTube and you will see it the moment it lands.</p>
      </li>'''
    out = []
    for i, ep in enumerate(reversed(POD['episodes'])):
        n = len(POD['episodes']) - i
        audio = f'<audio controls preload="none" src="{e(ep["audio"])}"></audio>' if ep.get('audio') else ''
        links = ''.join(ext(ep[k], lbl) for k, lbl in (('yt', 'YouTube'), ('sp', 'Spotify'), ('apple', 'Apple Podcasts')) if ep.get(k))
        out.append(f'''      <li class="ep">
        <span class="kind">Episode {n} · {e(ep['date'])}</span>
        <h3>{e(ep['title'])}</h3>
        <p>{e(ep['summary'])}</p>
        {audio}
        {f'<p class="also"><span>Listen on</span>{links}</p>' if links else ''}
      </li>''')
    return '\n'.join(out)


podlinks = ''.join(ext(POD['links'][k], lbl, 'btn btn-line') for k, lbl in (('youtube', 'YouTube'), ('spotify', 'Spotify'), ('apple', 'Apple Podcasts')) if POD['links'].get(k))

podcast = head('Podcast | Funkie Tee',
               'Faith Meets the Future: short, encouraging weekly episodes from Funkie Tee for the week ahead.',
               'podcast', 'Podcast | Funkie Tee') + header('podcast') + f'''
<main id="main">
<section class="pagehead" id="top">
  <div class="wrap">
    <span class="eyebrow">The podcast</span>
    <h1>{e(POD['name'])}</h1>
    <p class="lead">{e(POD['tagline'])} A new episode every week, each one under ten minutes.</p>
  </div>
</section>

<section class="on-ivory" id="about-pod">
  <div class="wrap pod-intro">
    <p class="pitch">Scripture, a story and one thing to carry into your week. No long preambles. Press play on your way to work, in the kitchen, or before you sleep.</p>
    <div class="row">
      {ext(YT_SUB, 'Subscribe on YouTube', 'btn btn-gold')}
      {podlinks}
    </div>
  </div>
</section>

<section class="on-ivory" id="episodes" style="padding-top:0">
  <div class="wrap">
    <div class="head"><span class="eyebrow">Episodes</span><h2>Listen</h2></div>
    <ul class="eps">
{episodes()}
    </ul>
  </div>
</section>
</main>
''' + footer()

open('index.html', 'w').write(home)
open('podcast.html', 'w').write(podcast)
open('music.html', 'w').write(music)

js = open('js/site.src.js').read()
slim = [{k: s[k] for k in ('slug', 'name', 'audio', 'cover', 'yt', 'sp', 'apple', 'am')} for s in SONGS]
open('js/site.js', 'w').write(js.replace('/*SONGS*/[]', json.dumps(slim, separators=(',', ':'))))
open('sitemap.xml', 'w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + SITE + '</loc></url><url><loc>' + SITE + 'music</loc></url><url><loc>' + SITE + 'podcast</loc></url></urlset>\n')
print('built', len(home), len(music))
