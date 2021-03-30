const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

// Function to verify token

function verifyJWT(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' })
  }

  const decryptedToken = cryptojs.AES.decrypt(token, process.env.SECRET_KEY).toString(cryptojs.enc.Utf8)
  
  jwt.verify(decryptedToken, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('Error -->', err)
      res.status(401).json({ message: 'Failed to authenticate' })
    }

    req.user = decoded
    next()
  })
}

module.exports = verifyJWT