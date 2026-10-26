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

// Registrar a visita no contador
fetch('https://countapi.mileshilliard.com/api/v1/hit/gustavopaiva9.com.br-visits',{cache:'no-store',keepalive:true}).catch(()=>{});

// NOTIFICAÇÃO NO DISCORD PARA CADA VISITA
// Função para enviar notificação ao Discord para cada visita
const sendDiscordVisitNotification = async (visitCount) => {
  const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1562479228405161996/oEnWaN5Sw9Jy7APDyKnGOn96c1vBZ3Ttr2CtDAsRwHU4-Z4I8gcIbKQTPYqeLdY56cDG';
  
  const discordPayload = {
    content: `👁️ **Nova Visita!**\n\n` +
             `**Visitante chegou ao GPN Studio!**\n\n` +
             `📊 Total de visitas: ${visitCount}\n\n` +
             `🌐 Site: https://gustavopaiva9.github.io/\n` +
             `⏰ Data: ${new Date().toLocaleDateString('pt-BR')}\n` +
             `🕐 Hora: ${new Date().toLocaleTimeString('pt-BR')}`,
    username: 'GPN Studio Bot',
    avatar_url: ''
  };
  
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload)
    });
    console.log('✅ Notificação de visita enviada ao Discord');
  } catch (error) {
    console.error('❌ Erro ao enviar notificação ao Discord:', error);
  }
};

// Enviar notificação para cada nova visita
const notifyNewVisit = async () => {
  try {
    const response = await fetch('https://countapi.mileshilliard.com/api/v1/get/gustavopaiva9.com.br-visits');
    const data = await response.json();
    const currentCount = data.value;
    
    // Enviar notificação para cada visita (exceto a primeira que já existe)
    if (currentCount > 0) {
      await sendDiscordVisitNotification(currentCount);
    }
  } catch (error) {
    console.error('❌ Erro ao verificar nova visita:', error);
  }
};

// Registrar e notificar nova visita quando a página carregar
notifyNewVisit();

contactForm?.addEventListener('submit',event=>{event.preventDefault();const submitButton=contactForm.querySelector('button[type="submit"]');const originalText=submitButton.textContent;submitButton.disabled=true;submitButton.textContent='Enviando...';formStatus.textContent='';formStatus.classList.remove('error');fetch(contactForm.action,{method:'POST',body:new FormData(contactForm),headers:{Accept:'application/json'}}).then(response=>response.json().then(data=>{if(!response.ok||data.ok===false){throw new Error(data.message||'Erro ao enviar')}return data})).then(()=>{contactForm.reset();formStatus.textContent='Mensagem enviada com sucesso.'}).catch(()=>{formStatus.textContent='Não foi possível enviar. Tente novamente.';formStatus.classList.add('error')}).finally(()=>{submitButton.disabled=false;submitButton.textContent=originalText})});
