document.getElementById('editBtn').addEventListener('click', async (e) => {
  e.preventDefault();

  const title = document.getElementById('titleInput').value.trim();
  const content = document.getElementById('contentArea').value.trim();
  const blog_id = document.getElementById('editPost').dataset.blogid;

  if (!(title && content)) {
    return document.getElementById('error').textContent = 'Please fill out all field';
  }

  const inputData = { title, content };

  const response = await fetch(`/api/blogs/${blog_id}`, {
    method: 'PATCH',
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
})

document.getElementById('deleteBtn').addEventListener('click', async (e) => {
  e.preventDefault();

  const blog_id = document.getElementById('editPost').dataset.blogid;

  const response = await fetch(`/api/blogs/${blog_id}`, { method: 'DELETE' });
  const result = await response.json();

  if (!response.ok) {
    return document.getElementById('error').textContent = result.msg;
  }

  return window.location.replace('/dashboard');
})