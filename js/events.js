import { createMapMarkup, isValidLocation } from './map.js';

/** Renderiza eventos y su mapa opcional desde contenido.json. */
export function renderEvents(events = []) {
  const container = document.getElementById('eventsContainer');
  if (!container) return;
  if (!events.length) { container.innerHTML = '<p class="empty-state">Próximamente publicaremos nuevos eventos.</p>'; return; }
  container.innerHTML = events.map(event => {
    const date = splitDate(event.fecha);
    const location = event.ubicacion || {};
    return `<article class="event-card" data-reveal>
      <div class="event-card__date"><span class="event-card__day">${escapeHtml(date.day)}</span><span class="event-card__month">${escapeHtml(date.month)}</span></div>
      <div class="event-card__body"><h3 class="event-card__title">${escapeHtml(event.titulo)}</h3>
      <p class="event-card__desc">${escapeHtml(event.descripcion)}</p>
      <div class="event-card__meta"><span><i class="fas fa-clock" aria-hidden="true"></i>${escapeHtml(event.hora || 'Por confirmar')}</span>${event.lugar ? `<span><i class="fas fa-map-marker-alt" aria-hidden="true"></i>${escapeHtml(event.lugar)}</span>` : ''}</div>
      ${isValidLocation(location) ? createMapMarkup(location, `Ubicación de ${event.titulo}`, 'event-map') : ''}</div></article>`;
  }).join('');
}

function splitDate(value = '') {
  const parts = value.trim().split(/\s+/);
  return { day: parts[0] || '--', month: (parts[1] || '').replace(/[^a-záéíóúñ]/gi, '').slice(0, 3).toUpperCase() || '---' };
}
function escapeHtml(value = '') { const el = document.createElement('div'); el.textContent = value; return el.innerHTML; }
