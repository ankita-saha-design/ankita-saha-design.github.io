
function fillSlot(slot, src){var el=slot.querySelector('img,video');if(!el){el=document.createElement('img');el.alt='';slot.appendChild(el);watch(el);}if(slot.classList)slot.classList.remove('loaded');el.src=src;}
function watch(el){var s=el.closest('.slot');function ok(){s&&s.classList.add('loaded');}
  if(el.tagName==='VIDEO')el.addEventListener('loadeddata',ok);else{el.addEventListener('load',ok);if(el.complete&&el.naturalWidth)ok();}
  el.addEventListener('error',function(){s&&s.classList.remove('loaded');el.remove();},true);
  if(el.tagName==='VIDEO'){var s=el.querySelector('source');if(s)s.addEventListener('error',function(){el.remove();});}
  if(el.tagName==='IMG'&&el.complete&&!el.naturalWidth)el.remove();}
document.querySelectorAll('.slot img,.slot video').forEach(watch);
document.querySelectorAll('.iconlib[data-lib]').forEach(function(root){
  var data=window[root.dataset.lib];if(!data)return;var ALL=[];(data[0]&&data[0].i?data:[{i:data}]).forEach(function(f){f.i.forEach(function(ic){ALL.push(ic);});});
  var STY=root.dataset.styles.split(','),per=+root.dataset.per||4,body=root.querySelector('.lib-body'),toast=root.querySelector('.xlib-toast'),tmr;
  root.style.setProperty('--per',per);root.style.setProperty('--n',STY.length);
  function nm(i){return ALL[i].n||('Icon '+(i+1));}
  function svg(ic,k){return '<svg viewBox="'+(ic.v||'0 0 56 56')+'" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+ic.s[k]+'</svg>';}
  function btn(i,k){return '<button type="button" data-i="'+i+'" data-k="'+k+'" title="'+nm(i)+' · '+STY[k]+'" aria-label="Copy '+nm(i)+' '+STY[k]+' SVG">'+svg(ALL[i],k)+'</button>';}
  function render(mode){var h='';if(mode==='all'){body.className='lib-body all';ALL.forEach(function(ic,i){h+='<div class="lgrp">';for(var k=0;k<STY.length;k++)h+=btn(i,k);h+='</div>';});}
    else{body.className='lib-body one';ALL.forEach(function(ic,i){h+=btn(i,+mode);});}body.innerHTML=h;}
  function show(t){toast.textContent=t;toast.classList.add('on');clearTimeout(tmr);tmr=setTimeout(function(){toast.classList.remove('on');},1600);}
  root.querySelector('.lib-tabs').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    root.querySelectorAll('.lib-tabs button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});render(b.dataset.style);});
  body.addEventListener('click',function(e){var b=e.target.closest('button[data-i]');if(!b)return;var i=+b.dataset.i,k=+b.dataset.k,ic=ALL[i];
    var code='<svg width="24" height="24" viewBox="'+(ic.v||'0 0 56 56')+'" fill="none" xmlns="http://www.w3.org/2000/svg">'+ic.s[k]+'</svg>';
    var done=function(){show('Copied '+nm(i)+' · '+STY[k]+' SVG');};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(code).then(done,function(){show(nm(i)+' · '+STY[k]);});}else show(nm(i)+' · '+STY[k]);});
  render('all');});
document.querySelectorAll('a[data-download]').forEach(function(a){a.addEventListener('click',function(){var d=document.createElement('a');d.href=a.href;d.download=a.dataset.download;d.style.display='none';document.body.appendChild(d);d.click();d.remove();});});
document.querySelectorAll('.tabs[data-target]').forEach(function(g){
  g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
    var slot=document.getElementById(g.dataset.target).querySelector('.slot');
    slot.setAttribute('data-label',b.dataset.src);fillSlot(slot,b.dataset.src);});});
(function(){var t=document.querySelector('.nav-toggle');if(!t)return;
  var menu=document.getElementById('nav-menu'),scrim=document.querySelector('.nav-scrim'),b=document.body;
  function set(open){b.classList.toggle('nav-open',open);t.setAttribute('aria-expanded',open?'true':'false');
    t.setAttribute('aria-label',open?'Close menu':'Open menu');}
  t.addEventListener('click',function(){set(!b.classList.contains('nav-open'));});
  if(scrim)scrim.addEventListener('click',function(){set(false);});
  if(menu)menu.addEventListener('click',function(e){if(e.target.closest('a'))set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
  addEventListener('resize',function(){if(innerWidth>760)set(false);});})();
(function(){
  var bands = document.querySelectorAll('.band');
  if(!bands.length) return;
  function onScroll(){
    var isScrolled = (window.scrollY || document.documentElement.scrollTop || 0) > 0;
    for(var i = 0; i < bands.length; i++){
      bands[i].classList.toggle('is-scrolled', isScrolled);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
