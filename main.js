// main.js

// --- Комментарии к теориям ---
function getComments(theoryId) {
  return JSON.parse(localStorage.getItem('comments_' + theoryId) || '[]');
}

function saveComment(theoryId, name, text) {
  const comments = getComments(theoryId);
  comments.push({ name, text, date: new Date().toLocaleString() });
  localStorage.setItem('comments_' + theoryId, JSON.stringify(comments));
}

function renderComments(theoryId) {
  const list = document.getElementById('comment-list');
  if (!list) return;
  list.innerHTML = '';
  const comments = getComments(theoryId);
  if (comments.length === 0) {
    list.innerHTML = '<li class="comment">Комментариев пока нет.</li>';
    return;
  }
  comments.forEach(c => {
    const li = document.createElement('li');
    li.className = 'comment';
    li.innerHTML = `<strong>${c.name}</strong> <span style="color:#888;font-size:0.9em;">${c.date}</span><br>${c.text}`;
    list.appendChild(li);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // Для страниц теорий
  const theoryId = document.body.dataset.theory;
  if (theoryId) {
    renderComments(theoryId);
    const form = document.getElementById('comment-form');
    form?.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.elements['name'].value.trim();
      const text = form.elements['text'].value.trim();
      if (!name || !text) return alert('Заполните все поля!');
      saveComment(theoryId, name, text);
      form.reset();
      renderComments(theoryId);
    });
  }

  // Для формы обратной связи
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Спасибо за обращение! Ваше сообщение отправлено.');
      contactForm.reset();
    });
  }
});
