const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', async (e) => {

  const response = await fetch('/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const result = await response.json();

  if (!response.ok) {
    return alert(result.msg);
  }

  return window.location.replace('/');
});