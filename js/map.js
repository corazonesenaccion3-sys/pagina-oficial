/** Construye mapas Google sin direcciones hardcodeadas en HTML. */
export function isValidLocation(location) { return Boolean(location && (location.googleMaps || location.embedUrl || location.direccion || (location.latitud && location.longitud))); }

export function getLocationQuery(location) {
  if (location.latitud != null && location.longitud != null) return `${location.latitud},${location.longitud}`;
  return [location.direccion, location.colonia, location.ciudad, location.estado, location.pais].filter(Boolean).join(', ');
}
export function getMapUrls(location) {
  const query = getLocationQuery(location);
  const openUrl = location.googleMaps || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  // Los enlaces compartidos se usan para abrir Maps; el iframe conserva una URL embebible.
  const embedUrl = location.embedUrl || (location.googleMaps?.includes('output=embed') ? location.googleMaps : `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`);
  return { openUrl, embedUrl };
}
export function createMapMarkup(location, title = 'Ubicación', extraClass = '') {
  if (!isValidLocation(location)) return '';
  const { openUrl, embedUrl } = getMapUrls(location);
  return `<div class="map-card ${extraClass}"><iframe class="map-card__frame" title="${title}" src="${embedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="map-card__link" href="${openUrl}" target="_blank" rel="noopener noreferrer">Abrir en Google Maps <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a></div>`;
}
export function renderMaps(content) {
  const container = document.getElementById('contactMap');
  const location = content.contacto?.ubicacion || content.contacto;
  if (container && isValidLocation(location)) container.innerHTML = createMapMarkup(location, 'Mapa del centro de reuniones');
}
