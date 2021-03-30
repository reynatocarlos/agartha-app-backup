// Function to validate post

function postValidation(req, res, next) {
  const { category, author, content } = req.body

  if (!category || !author || !content) {
    res.status(400).json({ message: 'All fields are required' })
  }

  next()
}

module.exports = postValidation