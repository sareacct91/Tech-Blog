const formEl = document.getElementById('loginForm');

async function formHandler(e) {
  e.preventDefault();

  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();

  if (!(username && password)) {
    return alert('Please fill out all fields');
  }

  const userData = { username, password };

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    document.getElementById('error').textContent = response.msg
  }

  window.location.replace('/');
};


formEl.addEventListener('submit', formHandler);