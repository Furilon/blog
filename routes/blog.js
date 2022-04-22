const express = require('express');
const router = express.Router();
const cors = require('cors')
const blog_controller = require('../controllers/blog_controller');
const comment_controller = require('../controllers/comment_controller');

// RESTish API:

// I have a blog, the DB model consists of blogposts
// comments.
//
// I want to be able to create, read, update, and delete posts
// but I want users to only be able to read them.
//
// I want users to create comments
// But I will be able to create and delete them
// (Reading doesn't make sense because they will be
//  supplied with the post.)

router.options('*', cors())

// POSTS ROUTERS
/* READ posts. */
router.get('/', blog_controller.posts_get);

/* CREATE a post. */
router.post('/', cors(), blog_controller.posts_post);

/* READ a post */
router.get('/:postId', blog_controller.one_post_get)

/* UPDATE a post. */
router.put('/:postId', cors(), blog_controller.posts_put);

/* DELETE a post. */
router.delete('/:postId', blog_controller.posts_delete);

// COMMENTS ROUTERS
// CREATE a comment
router.post('/:postId/comment', cors(), comment_controller.comment_post);

// DELETE a comment
router.delete(
    '/:postId/comment/:commentId',
    comment_controller.comment_delete
);

module.exports = router;
