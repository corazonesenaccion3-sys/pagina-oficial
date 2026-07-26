/** Menú móvil accesible y cierre al navegar. */
export function initNavbar() {
  const menuButton = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  if (!menuButton || !nav) return;

  const setOpen = open => {
    nav.classList.toggle('nav--open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('i')?.classList.toggle('fa-bars', !open);
    menuButton.querySelector('i')?.classList.toggle('fa-times', open);
  };
  menuButton.addEventListener('click', () => setOpen(!nav.classList.contains('nav--open')));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
}
