const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('blogs/index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  if (Blog.isValidId(id)) {
    Blog.findById(id)
      .then(result => {
        res.render('blogs/details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
        res.status(404).render('404', { title: 'Blog not found' });
      });
  } else {
    res.status(404).render('404', { title: 'Blog not found' });
  }
}

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_edit_get = (req, res) => {
  const id = req.params.id;
  if (Blog.isValidId(id)) {
    Blog.findById(id)
      .then(result => {
        res.render('blogs/edit', { blog: result, title: 'Edit Blog' });
      })
      .catch(err => {
        console.log(err);
        res.status(404).render('404', { title: 'Blog not found' });
      });
  } else {
    res.status(404).render('404', { title: 'Blog not found' });
  }
}

const blog_edit_put = (req, res) => {
  const blog = new Blog(req.body);
  const id = blog._id;
  delete blog._id;

  Blog.findByIdAndUpdate(id, blog)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_edit_get,
  blog_edit_put
}