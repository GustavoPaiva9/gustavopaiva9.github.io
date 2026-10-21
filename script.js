// GPN Studio | Desenvolvido por Gustavo de Paiva
const toggle=document.querySelector('.menu-toggle');const links=document.querySelector('.nav-links');const contactForm=document.querySelector('#contact-form');const formStatus=document.querySelector('.form-status');

// Função para obter o contador de visitas
const getVisitCount = async () => {
  try {
    const response = await fetch('https://countapi.mileshilliard.com/api/v1/get/gustavopaiva9.com.br-visits');
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('Erro ao obter visitas:', error);
    return 'N/A';
  }
};

// Atualizar o contador de visitas
const updateVisitCount = async () => {
  const visitCountElement = document.getElementById('visit-count');
  if (visitCountElement) {
    const count = await getVisitCount();
    visitCountElement.textContent = count;
    
    // Quando atingir 10K, destacar
    if (count >= 10000) {
      visitCountElement.classList.add('pulse');
      visitCountElement.title = '🎉 Milestone de 10K visitas alcançado!';
    } else {
      visitCountElement.classList.remove('pulse');
    }
  }
};

// Iniciar o contador quando a página carregar
if (document.getElementById('visit-count')) {
  updateVisitCount();
  
  // Atualizar a cada 30 segundos
  setInterval(updateVisitCount, 30000);
}

toggle?.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

// Manter o contador ativo
fetch('https://countapi.mileshilliard.com/api/v1/hit/gustavopaiva9.com.br-visits',{cache:'no-store',keepalive:true}).catch(()=>{});

contactForm?.addEventListener('submit',event=>{event.preventDefault();const submitButton=contactForm.querySelector('button[type="submit"]');const originalText=submitButton.textContent;submitButton.disabled=true;submitButton.textContent='Enviando...';formStatus.textContent='';formStatus.classList.remove('error');fetch(contactForm.action,{method:'POST',body:new FormData(contactForm),headers:{Accept:'application/json'}}).then(response=>response.json().then(data=>{if(!response.ok||data.ok===false){throw new Error(data.message||'Erro ao enviar')}return data})).then(()=>{contactForm.reset();formStatus.textContent='Mensagem enviada com sucesso.'}).catch(()=>{formStatus.textContent='Não foi possível enviar. Tente novamente.';formStatus.classList.add('error')}).finally(()=>{submitButton.disabled=false;submitButton.textContent=originalText})});

// Atualizar o contador de visitas quando a página carregar
if (document.getElementById('visit-count')) {
  updateVisitCount();
  
  // Atualizar a cada 30 segundos
  setInterval(updateVisitCount, 30000);
}
