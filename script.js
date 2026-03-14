const langToggle=document.getElementById('langToggle');
const hamburger=document.getElementById('hamburger');
const navLinks=document.getElementById('navLinks');
const navbar=document.getElementById('navbar');
const scrollProgress=document.getElementById('scrollProgress');
const backToTop=document.getElementById('backToTop');
const floatingContact=document.getElementById('floatingContact');
let currentLang='en';

langToggle.addEventListener('click',()=>{
currentLang=currentLang==='en'?'ar':'en';
const langText=langToggle.querySelector('.lang-text');
langText.textContent=currentLang==='en'?'AR':'EN';
document.documentElement.lang=currentLang;
document.documentElement.dir=currentLang==='ar'?'rtl':'ltr';
document.body.classList.toggle('rtl',currentLang==='ar');
document.querySelectorAll('[data-en]').forEach(el=>{
el.textContent=el.getAttribute(currentLang==='en'?'data-en':'data-ar');
});
});

hamburger.addEventListener('click',()=>{
hamburger.classList.toggle('active');
navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link=>{
link.addEventListener('click',()=>{
hamburger.classList.remove('active');
navLinks.classList.remove('open');
});
});

window.addEventListener('scroll',()=>{
navbar.classList.toggle('scrolled',window.scrollY>50);

const winH=document.documentElement.scrollHeight-window.innerHeight;
const scrolled=(window.scrollY/winH)*100;
scrollProgress.style.width=scrolled+'%';

backToTop.classList.toggle('visible',window.scrollY>500);

const contactSection=document.getElementById('contact');
const contactTop=contactSection.offsetTop;
const contactBottom=contactTop+contactSection.offsetHeight;
const inContact=window.scrollY+window.innerHeight>contactTop&&window.scrollY<contactBottom;
floatingContact.classList.toggle('hidden',inContact||window.scrollY<300);

const sections=document.querySelectorAll('section');
let current='';
sections.forEach(s=>{
if(window.scrollY>=s.offsetTop-200)current=s.getAttribute('id');
});
navLinks.querySelectorAll('a').forEach(a=>{
a.classList.toggle('active',a.getAttribute('href')==='#'+current);
});
});

backToTop.addEventListener('click',()=>{
window.scrollTo({top:0,behavior:'smooth'});
});

const observer=new IntersectionObserver((entries)=>{
entries.forEach((entry,i)=>{
if(entry.isIntersecting){
setTimeout(()=>entry.target.classList.add('visible'),i*100);
observer.unobserve(entry.target);
}
});
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});

document.querySelectorAll('.anim-fade,.anim-slide-up,.anim-slide-down,.anim-slide-right,.anim-slide-left,.anim-scale').forEach(el=>observer.observe(el));

const skillObserver=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.querySelectorAll('.skill-fill').forEach(fill=>{
fill.style.width=fill.dataset.width+'%';
});
skillObserver.unobserve(entry.target);
}
});
},{threshold:0.3});

document.querySelectorAll('.skills-grid').forEach(el=>skillObserver.observe(el));

const counters=document.querySelectorAll('.stat-number');
const counterObserver=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const target=+entry.target.dataset.count;
let count=0;
const step=Math.ceil(target/40);
const interval=setInterval(()=>{
count+=step;
if(count>=target){
count=target;
clearInterval(interval);
}
entry.target.textContent=count;
},30);
counterObserver.unobserve(entry.target);
}
});
},{threshold:0.5});

counters.forEach(c=>counterObserver.observe(c));

document.querySelectorAll('.service-card').forEach(card=>{
card.addEventListener('mousemove',e=>{
const rect=card.getBoundingClientRect();
const x=e.clientX-rect.left;
const y=e.clientY-rect.top;
const glow=card.querySelector('.service-glow');
if(glow){
glow.style.left=(x-rect.width)+'px';
glow.style.top=(y-rect.height)+'px';
glow.style.opacity='1';
}
});
card.addEventListener('mouseleave',()=>{
const glow=card.querySelector('.service-glow');
if(glow)glow.style.opacity='0';
});
});

document.getElementById('currentYear').textContent=new Date().getFullYear();

floatingContact.classList.add('hidden');
setTimeout(()=>{
if(window.scrollY>300)floatingContact.classList.remove('hidden');
},1000);
