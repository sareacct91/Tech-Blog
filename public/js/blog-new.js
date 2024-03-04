//@ts-check

document.getElementById('newPost')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('titleInput')?.value.trim();
  const content = document.getElementById('contentArea')?.value.trim();
  const errorEl = document.getElementById('error');

  if (!(title && content)) {
    return errorEl ? errorEl.textContent = 'Please fill out all fields' : alert('Please fill out all fields');
  }

  const inputData = { title, content };
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData),
  });
  const result = await response.json();

  if (!response.ok) {
    return errorEl ? errorEl.textContent = result.msg : alert(result.msg);
  }

  return window.location.replace('/dashboard');
});