(()=>{
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 if(preference.matches||!('IntersectionObserver' in window))return;
 const selector='.testimonial-grid,#expertise .section-heading,#expertise .question,.accountant-intro,.accountant-profile,.mot-grid,.package-guide,.package-heading,.common-services,.plan,.custom,.sole-traders,.review-intro,.agenda,#getting-started .section-heading,.start-steps article,.records-note,.faq-grid,.cta-inner';
 const items=[...document.querySelectorAll(selector)];
 let observer;
 const reveal=element=>{element.classList.remove('motion-pending');if(observer)observer.unobserve(element)};
 const revealTarget=target=>{if(!target)return;items.forEach(element=>{if(element===target||element.contains(target)||target.contains(element))reveal(element)})};
 const revealHash=()=>{const id=decodeURIComponent(location.hash.slice(1));if(id)revealTarget(document.getElementById(id))};
 try{
 observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)reveal(entry.target)})},{threshold:0,rootMargin:'0px 0px -24px 0px'});
 items.forEach(element=>{
  if(element.getBoundingClientRect().top<innerHeight)return;
  element.classList.add('motion-reveal');
  observer.observe(element);element.classList.add('motion-pending');
 });
 revealHash();
 addEventListener('hashchange',revealHash);
 document.addEventListener('focusin',event=>revealTarget(event.target));
 document.addEventListener('click',event=>{const link=event.target.closest('a[href^="#"]');if(link){const id=decodeURIComponent(link.hash.slice(1));if(id)revealTarget(document.getElementById(id))}});
 preference.addEventListener('change',()=>{if(preference.matches){items.forEach(reveal);observer.disconnect()}});
 addEventListener('beforeprint',()=>items.forEach(reveal));
 }catch(error){items.forEach(reveal);if(observer)observer.disconnect()}
})();