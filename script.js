const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const apiBase = 'https://dinchen-digital.onrender.com';

document.querySelector('.contact-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = document.querySelector('.form-status');
  const submitButton = event.target.querySelector('.submit-btn');
  submitButton.disabled = true;
  status.textContent = 'Sending your booking...';

  try {
    const response = await fetch(`${apiBase}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Unable to send booking.');
    status.textContent = result.message;
    event.target.reset();
  } catch (error) {
    status.textContent = `${error.message} Please call or WhatsApp 78649 53041.`;
  } finally {
    submitButton.disabled = false;
  }
});
