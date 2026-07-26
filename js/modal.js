/** Infraestructura accesible para el modal de perfiles. */
export function initModal() {
  const overlay = document.getElementById('volModalOverlay');
  const closeButton = document.getElementById('volModalClose');
  if (!overlay || !closeButton) return;
  const close = () => { overlay.classList.remove('modal-overlay--open'); document.body.classList.remove('no-scroll'); };
  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
}
