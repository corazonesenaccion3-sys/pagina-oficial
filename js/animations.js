/** Revelado reutilizable basado en IntersectionObserver. */
export function initAnimations(root = document) {
  const elements = root.querySelectorAll('[data-reveal], .card, .donate-card, .about__content, .about__image, .contact__info, .contact__illustration');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  elements.forEach(element => { element.classList.add('reveal'); observer.observe(element); });
}
