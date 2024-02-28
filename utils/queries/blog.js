const { Blog } = require('../../model');
const { } = require('../errors');


async function findAllBlogs() {
  const result = Blog.findAll()

  if (!result) {
    
  }
}