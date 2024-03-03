document.getElementById('newPost')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('titleInput').value.trim();
    const content = document.getElementById('contentArea').value.trim();

    if (!(title && content)) {
      return document.getElementById('error').textContent = 'Please fill out all fields';
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
      return document.getElementById('error').textContent = result.msg;
    }

    return window.location.replace('/dashboard');
  });