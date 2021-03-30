const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET

// Function to generate a token

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret)
}

module.exports = generateToken