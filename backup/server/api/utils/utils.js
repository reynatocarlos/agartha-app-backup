const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET

// Format Date

const formatDate = (x, y) => {
  let z = {
    M: x.getMonth() + 1,
    d: x.getDate(),
    h: x.getHours(),
    m: x.getMinutes(),
    s: x.getSeconds()
  }
  y = y.replace(/(M+|d+|h+|m+|s+)/g, (v) => ((v.length > 1 ? '0' : '') + z[v.slice(-1)]).slice(-2))

  return y.replace(/(y+)/g, v => x.getFullYear().toString().slice(-v.length))
}

// Generate Token

const generateToken = (user) => {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: '12h' })
}

// Validate Email

const validateEmail = (email) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return true
  } else {
    return false
  }
}

module.exports = { formatDate, generateToken, validateEmail }