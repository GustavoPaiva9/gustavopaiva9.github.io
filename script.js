// GPN Studio | Desenvolvido por Gustavo de Paiva
const toggle=document.querySelector('.menu-toggle');const links=document.querySelector('.nav-links');const accessCounter=document.querySelector('#access-counter');
toggle?.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
if(accessCounter){fetch('https://countapi.mileshilliard.com/api/v1/hit/gustavopaiva9.com.br-visits',{cache:'no-store'}).then(response=>{if(!response.ok){throw new Error('Contador indisponível')}return response.json()}).then(data=>{const visits=Number(data.value);accessCounter.textContent=Number.isFinite(visits)?new Intl.NumberFormat('pt-BR').format(visits):'—'}).catch(()=>{accessCounter.textContent='—'})}
