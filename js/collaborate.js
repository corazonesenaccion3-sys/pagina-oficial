const CONFIG_URL = 'colabora.json';

export async function initCollaboration() {
  const clothingLink = document.getElementById('donateClothing');
  const moneyButton = document.getElementById('donateMoney');
  const volunteerLink = document.getElementById('joinVolunteers');
  if (!clothingLink || !moneyButton || !volunteerLink) return;

  try {
    const response = await fetch(CONFIG_URL, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Error al cargar colaboración (${response.status})`);
    const config = await response.json();
    configureMapsLink(clothingLink, config.ropaJuguetes);
    configureVolunteerLink(volunteerLink, config.voluntariado);
    initDonationModal(moneyButton, config.donacionEconomica);
  } catch (error) {
    console.error('No fue posible cargar la configuración de colaboración.', error);
    [clothingLink, moneyButton, volunteerLink].forEach(disableAction);
  }
}

function configureMapsLink(link, location = {}) {
  const address = location.direccion?.trim();
  const url = location.googleMapsUrl?.trim() || (address && `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
  if (!url) return disableAction(link);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
}

function configureVolunteerLink(link, volunteer = {}) {
  const url = volunteer.grupoUrl?.trim();
  if (!url) return disableAction(link, 'Agrega el enlace del grupo en colabora.json');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
}

function disableAction(element, message = 'Configura esta opción en colabora.json') {
  element.removeAttribute('href');
  element.setAttribute('aria-disabled', 'true');
  element.title = message;
  element.classList.add('donate-card--disabled');
  element.addEventListener('click', event => event.preventDefault());
}

function initDonationModal(trigger, donation = {}) {
  const modal = document.getElementById('donationModal');
  const closeButton = document.getElementById('donationModalClose');
  const content = document.getElementById('donationModalContent');
  if (!modal || !closeButton || !content) return disableAction(trigger);

  renderDonationDetails(content, donation);
  const close = () => {
    modal.classList.remove('donation-modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    trigger.focus();
  };
  trigger.addEventListener('click', () => {
    modal.classList.add('donation-modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    closeButton.focus();
  });
  closeButton.addEventListener('click', close);
  modal.addEventListener('click', event => { if (event.target === modal) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('donation-modal--open')) close(); });
}

function renderDonationDetails(container, donation) {
  const details = [
    ['Banco', donation.banco],
    ['Titular', donation.titular],
    ['Cuenta', donation.cuenta],
    ['CLABE', donation.clabe],
    ['Referencia', donation.referencia]
  ].filter(([, value]) => value);
  container.replaceChildren();
  details.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'donation-modal__detail';
    const title = document.createElement('strong');
    title.textContent = label;
    const text = document.createElement('span');
    text.textContent = value;
    row.append(title, text);
    container.append(row);
  });
  if (donation.instrucciones) {
    const instructions = document.createElement('p');
    instructions.className = 'donation-modal__instructions';
    instructions.textContent = donation.instrucciones;
    container.append(instructions);
  }
}
