/** Anima contadores una sola vez al entrar al viewport. */
export function initCounters() {
  const numbers = document.querySelectorAll('.stat__number[data-count]');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target, Number(entry.target.dataset.count));
    observer.unobserve(entry.target);
  }), { threshold: 0.5 });
  numbers.forEach(number => observer.observe(number));
}

function animateCounter(element, target) {
  const duration = 1200;
  const start = performance.now();
  const frame = now => {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = `${Math.round(target * progress)}+`;
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
