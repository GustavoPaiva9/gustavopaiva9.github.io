// GPN Studio | Desenvolvido por Gustavo de Paiva
const toggle=document.querySelector('.menu-toggle');const links=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
fetch('https://countapi.mileshilliard.com/api/v1/hit/gustavopaiva9.com.br-visits',{cache:'no-store',keepalive:true}).catch(()=>{});
