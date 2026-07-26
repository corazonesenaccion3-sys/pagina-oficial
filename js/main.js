/** Punto de entrada: coordina módulos, sin lógica de interfaz acoplada. */
import { loadContent } from './dataLoader.js';
import { initNavbar } from './navbar.js';
import { initAnimations } from './animations.js';
import { initCounters } from './counters.js';
import { renderEvents } from './events.js';
import { renderGallery } from './gallery.js';
import { initModal } from './modal.js';
import { initWhatsApp } from './whatsapp.js';
import { renderMaps } from './map.js';
import { renderContactDetails } from './contact.js';
import { initCollaboration } from './collaborate.js';

document.addEventListener('DOMContentLoaded', async () => {
  initNavbar();
  initModal();
  initWhatsApp();
  initCollaboration();

  try {
    const content = await loadContent();
    renderEvents(content.eventos);
    renderGallery(content.galeria);
    renderMaps(content);
    renderContactDetails(content.contacto);
  } catch (error) {
    console.error('No fue posible inicializar el contenido dinámico.', error);
  }

  initCounters();
  initAnimations();
});
