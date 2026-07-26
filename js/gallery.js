/** Galería generada desde contenido.json. */
export function renderGallery(items = []) {
  const container = document.getElementById('galleryContainer');
  if (!container || !items.length) return;
  container.innerHTML = items.map(item => `<figure class="gallery__item" data-reveal>
    <img src="${item.imagen}" alt="${item.alt || item.titulo || 'Actividad de Corazones en Acción'}" loading="lazy">
    <figcaption class="gallery__item-overlay"><span>${item.titulo || ''}</span></figcaption></figure>`).join('');
}
