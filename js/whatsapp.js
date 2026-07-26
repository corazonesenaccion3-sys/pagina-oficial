const WHATSAPP_URL = 'https://wa.me/529662432453';

/** Botón flotante; se oculta de forma semántica al entrar en Contacto. */
export function initWhatsApp() {
  const section = document.getElementById('contacto');
  if (!section) return;
  const button = document.createElement('a');
  button.className = 'whatsapp-float'; button.href = WHATSAPP_URL; button.target = '_blank'; button.rel = 'noopener noreferrer';
  button.setAttribute('aria-label', 'Escríbenos por WhatsApp');
  button.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i><span>WhatsApp</span>';
  document.body.append(button);
  new IntersectionObserver(([entry]) => button.classList.toggle('whatsapp-float--hidden', entry.isIntersecting), { threshold: 0.12 }).observe(section);
}
