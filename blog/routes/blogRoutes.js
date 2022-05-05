const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/create', blogController.blog_create_get);
router.get('/edit/:id', blogController.blog_edit_get);
router.get('/:id', blogController.blog_details);
router.get('/', blogController.blog_index);
router.put('/edit', blogController.blog_edit_put);
router.delete('/:id', blogController.blog_delete);
router.post('/', blogController.blog_create_post);

module.exports = router;