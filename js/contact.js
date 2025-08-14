const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function setStatus(msg, ok=true){
  statusEl.textContent = msg;
  statusEl.style.color = ok ? 'green' : 'crimson';
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    await new Promise(r => setTimeout(r, 600));
    console.log('Form submission:', data);
    setStatus('Thanks! Your message has been sent.');
    form.reset();
  } catch (err) {
    setStatus('Something went wrong. Please try again.', false);
  }
});
