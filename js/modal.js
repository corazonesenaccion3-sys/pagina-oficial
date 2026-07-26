/** Modal reutilizable y accesible para los perfiles de voluntariado. */
let profiles = new Map();
let isInitialized = false;
let lastTrigger = null;
let overlay;
let closeButton;
let content;

export function initModal(items = []) {
  if (items.length) profiles = new Map(items.map(item => [String(item.id), item]));

  overlay = document.getElementById('volModalOverlay');
  closeButton = document.getElementById('volModalClose');
  content = document.getElementById('volModalContent');
  if (!overlay || !closeButton || !content || isInitialized) return;

  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeModal();
  });
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', event => {
    const card = event.target.closest('.eq-card--voluntario[data-profile-id]');
    if (!card || !window.matchMedia('(max-width: 768px)').matches) return;
    openModal(card.dataset.profileId, event.target.closest('button') || card.querySelector('.eq-card__profile-trigger'));
  });

  isInitialized = true;
}

function openModal(id, trigger) {
  const profile = profiles.get(String(id));
  if (!profile) return;

  lastTrigger = trigger;
  renderProfile(profile);
  overlay.classList.add('vol-profile-modal--open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  document.documentElement.classList.add('no-scroll');
  closeButton.focus();
}

function closeModal() {
  if (!overlay?.classList.contains('vol-profile-modal--open')) return;
  overlay.classList.remove('vol-profile-modal--open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  document.documentElement.classList.remove('no-scroll');
  lastTrigger?.focus();
  lastTrigger = null;
}

function handleKeydown(event) {
  if (!overlay?.classList.contains('vol-profile-modal--open')) return;
  if (event.key === 'Escape') {
    closeModal();
    return;
  }
  if (event.key === 'Tab') trapFocus(event);
}

function trapFocus(event) {
  const focusable = overlay.querySelectorAll('a[href], button:not([disabled])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function renderProfile(profile) {
  content.replaceChildren();
  const image = document.createElement('img');
  image.className = 'vol-profile-modal__photo';
  image.src = profile.foto;
  image.alt = `Foto de ${profile.nombre}`;

  const name = document.createElement('h2');
  name.className = 'vol-profile-modal__name';
  name.textContent = profile.nombre;

  const presentation = document.createElement('p');
  presentation.className = 'vol-profile-modal__text';
  presentation.textContent = profile.presentacion || '';

  const quote = document.createElement('blockquote');
  quote.className = 'vol-profile-modal__quote';
  quote.textContent = profile.frase ? `“${profile.frase}”` : '';

  content.append(image, name, presentation, quote);
  if (profile.redSocial?.url) content.append(createSocialLink(profile.redSocial));
}

function createSocialLink(social) {
  const link = document.createElement('a');
  const isInstagram = social.nombre?.toLowerCase().includes('instagram');
  const isFacebook = social.nombre?.toLowerCase().includes('facebook');
  const icon = document.createElement('i');
  icon.className = `fab ${isInstagram ? 'fa-instagram' : isFacebook ? 'fa-facebook-f' : 'fa-link'}`;
  icon.setAttribute('aria-hidden', 'true');
  link.className = 'vol-profile-modal__social';
  link.href = social.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.append(icon, document.createTextNode(social.nombre || 'Red social'));
  return link;
}
