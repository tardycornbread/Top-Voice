const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

// Mobile nav
const navToggle = $('.nav-toggle');
const siteNav = $('.site-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Active nav
$$('.site-nav a').forEach(a => {
  const here = location.pathname.split('/').pop() || 'index.html';
  if (a.getAttribute('href') === here) a.classList.add('active');

  a.addEventListener('click', () => {
    siteNav.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Prefill interest → contact page
(function(){
  const params = new URLSearchParams(location.search);
  const interest = params.get('interest');
  if (!interest) return;
  const select = document.querySelector('select[name="services"]');
  if (!select) return;
  const map = {education:'Full-Stack Growth', health:'PR', tech:'Paid Media', consumer:'Influencer Marketing', culture:'Influencer Marketing', community:'Livestream Commerce'};
  const label = map[interest];
  if (label) [...select.options].forEach(o => { if (o.textContent === label) o.selected = true; });
})();

// Pause hero video when off-screen to save power
(() => {
  const vid = document.querySelector('.hero-video');
  if (!vid || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { e.isIntersecting ? vid.play()?.catch(()=>{}) : vid.pause?.(); });
  }, {threshold:0.1});
  io.observe(vid);
})();
