const express = require('express')
const router = express.Router()

const { 
        get_users_GET, 
        logIn_POST, 
        registration_POST, 
        authentication_GET 
      } = require('../controllers/accountControllers')
const verifyJWT = require('../middlewares/verifyJWT')

router.get('/', get_users_GET)
router.post('/signup', registration_POST)
router.post('/signin', logIn_POST)
router.get('/auth', verifyJWT, authentication_GET)

module.exports = router