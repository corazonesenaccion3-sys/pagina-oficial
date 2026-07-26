import { loadContent } from './dataLoader.js';
import { renderTeamCards } from './team.js';

document.addEventListener('DOMContentLoaded', async () => {
  const grids = { voluntario: document.getElementById('gridVoluntarios'), comunidad: document.getElementById('gridComunidad'), donador: document.getElementById('gridDonadores') };
  try {
    const content = await loadContent();
    const groups = { voluntario: content.voluntarios, comunidad: content.comunidad, donador: content.donadores };
    Object.entries(grids).forEach(([type, grid]) => {
      if (!grid) return;
      const items = groups[type] || [];
      if (items.length) renderTeamCards(grid, items, type);
      else grid.closest('.section')?.setAttribute('hidden', '');
    });
  } catch (error) {
    console.error(error);
    Object.values(grids).forEach(grid => { if (grid) grid.innerHTML = '<p class="empty-state">No pudimos cargar esta sección.</p>'; });
  }
});
