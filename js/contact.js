export function initContactForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-submit');
  
  if (!form || !btn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // UI Feedback for "sending"
    const originalText = btn.querySelector('span').innerText;
    btn.querySelector('span').innerText = '[ TRANSMITTING... ]';
    btn.classList.add('sending');
    
    // Simulate network request
    setTimeout(() => {
      btn.classList.remove('sending');
      btn.querySelector('span').innerText = '[ SIGNAL RECEIVED ]';
      btn.style.background = 'var(--neon-green)';
      btn.style.color = '#000';
      
      form.reset();
      
      setTimeout(() => {
        btn.querySelector('span').innerText = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
      
    }, 2000);
  });
}
