/** Renderizador compartido para las tarjetas de equipo. */
export function renderTeamCards(container, items, type) {
  container.innerHTML = items.map(item => renderCard(item, type)).join('');
}

function renderCard(item, type) {
  if (type === 'comunidad') return `<article class="eq-card eq-card--comunidad"><img class="eq-card__photo" src="${item.foto}" alt="${safe(item.evento)}" loading="lazy"><div class="eq-card__body"><span class="eq-card__badge"><i class="fas fa-calendar-alt" aria-hidden="true"></i> ${safe(item.fecha)}</span><h3 class="eq-card__name">${safe(item.evento)}</h3><div class="eq-card__divider"></div><p class="eq-card__text">${safe(item.descripcion)}</p></div></article>`;
  if (type === 'donador') return `<article class="eq-card eq-card--donador"><img class="eq-card__photo" src="${item.foto}" alt="${safe(item.nombre)}" loading="lazy"><div class="eq-card__body"><span class="eq-card__badge eq-card__badge--tipo">${safe(item.tipo)}</span><h3 class="eq-card__name">${safe(item.nombre)}</h3><div class="eq-card__divider"></div><p class="eq-card__text eq-card__text--italic">“${safe(item.mensaje)}”</p></div></article>`;
  return `<article class="eq-card eq-card--voluntario" data-profile-id="${safe(item.id)}"><img class="eq-card__photo" src="${item.foto}" alt="Foto de ${safe(item.nombre)}" loading="lazy"><div class="eq-card__body"><h3 class="eq-card__name">${safe(item.nombre)}</h3><div class="eq-card__divider"></div><p class="eq-card__label">Sobre mí</p><p class="eq-card__text">${safe(item.presentacion)}</p><div class="eq-card__quote"><p>“${safe(item.frase)}”</p></div>${social(item.redSocial)}<button class="eq-card__profile-trigger" type="button" aria-label="Ver perfil de ${safe(item.nombre)}">Ver perfil <i class="fas fa-arrow-right" aria-hidden="true"></i></button></div></article>`;
}
function social(value) { if (!value?.url) return ''; const icon = value.nombre?.toLowerCase().includes('instagram') ? 'fa-instagram' : value.nombre?.toLowerCase().includes('facebook') ? 'fa-facebook-f' : 'fa-link'; return `<a href="${value.url}" target="_blank" rel="noopener noreferrer" class="eq-card__social"><i class="fab ${icon}" aria-hidden="true"></i>${safe(value.nombre)}</a>`; }
function safe(value = '') { const element = document.createElement('span'); element.textContent = value; return element.innerHTML; }
