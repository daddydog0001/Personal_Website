const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
header.classList.add('has-menu');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
let navigationFrame;
function fitNavigation() {
  cancelAnimationFrame(navigationFrame);
  navigationFrame = requestAnimationFrame(() => {
    const inner = header.querySelector('.nav-inner');
    const brand = header.querySelector('.brand');
    header.classList.add('is-measuring');
    const available = inner.clientWidth - brand.getBoundingClientRect().width - 32;
    const compact = matchMedia('(max-width: 1100px)').matches || navigation.scrollWidth > available;
    header.classList.remove('is-measuring');
    if (header.classList.contains('compact-navigation') !== compact) closeMenu();
    header.classList.toggle('compact-navigation', compact);
    document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  });
}
const navigationObserver = new ResizeObserver(fitNavigation);
navigationObserver.observe(header.querySelector('.nav-inner'));
navigationObserver.observe(header.querySelector('.brand'));
document.fonts.ready.then(fitNavigation);
window.addEventListener('resize', fitNavigation);
fitNavigation();

const modal = document.querySelector('#imageModal');
const modalImage = document.querySelector('#expandedImage');
const closeButton = document.querySelector('#modalCloseButton');
document.querySelectorAll('.image-button').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt;
    modal.showModal();
    document.body.classList.add('preview-open');
    closeButton.focus();
  });
});
closeButton.addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target === modal) modal.close();
});
modal.addEventListener('close', () => document.body.classList.remove('preview-open'));
