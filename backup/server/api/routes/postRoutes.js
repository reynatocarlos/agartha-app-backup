const express = require('express')
const router = express.Router()

const { 
        get_posts_GET, 
        create_post_POST, 
        get_post_GET,
        update_post_PUT, 
        delete_post_DEL, 
        like_post_GET,
        like_post_POST
      } = require('../controllers/postControllers')

const postValidation = require('../validations/postValidation')

router.get('/query', get_posts_GET)
router.post('/post/create', postValidation, create_post_POST)
router
  .route('/post/:id')
    .get(get_post_GET)
    .put(update_post_PUT)
    .delete(delete_post_DEL)
router
  .route('/post/:id/like')
    .get(like_post_GET)
    .post(like_post_POST)

module.exports = router