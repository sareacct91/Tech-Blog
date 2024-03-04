//@ts-check

document.getElementById('commentForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const textEl = document.getElementById('commentArea');
  const content = textEl?.value.trim();
  const blog_id = textEl?.dataset.blogid;
  const errorEl = document.getElementById('error');

  if (!content) {
    return errorEl ? errorEl.textContent = 'Please type in the comment' : alert('Please type in the comment');
  }

  const inputData = { content, blog_id };
  const response = await fetch('/api/comments', {
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

  return window.location.reload();
})