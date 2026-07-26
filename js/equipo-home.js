import { loadContent } from './dataLoader.js';
import { renderTeamCards } from './team.js';

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('eqHomeGrid');
  if (!grid) return;
  try {
    const { voluntarios } = await loadContent();
    renderTeamCards(grid, voluntarios.slice(0, 8), 'voluntario');
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p class="empty-state">Próximamente conocerás a nuestro equipo.</p>';
  }
});
