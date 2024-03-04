//@ts-check

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = (document.getElementById('usernameInput'))?.value.trim();
  const password = document.getElementById('passwordInput')?.value.trim();

  const errorEl = document.getElementById('error');

  if (!(username && password)) {
    return errorEl ? errorEl.textContent = 'Please fill out all fields' : alert('Please fill out all fields');
  }

  const userData = { username, password };
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    return errorEl ? errorEl.textContent = result.msg : alert(result.msg);
  }

  return window.location.replace('/');
});