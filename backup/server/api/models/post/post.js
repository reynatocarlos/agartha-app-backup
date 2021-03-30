const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  status: { type: String, required: true, enum: ['active', 'edited', 'deleted'], default: 'active' },
  category: { type: String, required: true, enum: ['Stress', 'Anxiety', 'Depression', 'My Story', 'None'], default: 'None' },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Profile' },
  content: { type: String, required: true },
  countOfLikes: { type: Number, required: true, default: 0 },
  countOfComments: { type: Number, required: true, default: 0 }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Post', postSchema)