const mongoose = require('mongoose')

const postLikeSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  whoLike: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Profile' }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Post-Like', postLikeSchema)