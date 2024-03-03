document.getElementById('signupForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    if (!(username && password)) {
      return document.getElementById('error').textContent = 'Please fill out all fields';
    }

    const userData = { username, password };

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
      return document.getElementById('error').textContent = result.msg
    }

    return window.location.replace('/');
  });