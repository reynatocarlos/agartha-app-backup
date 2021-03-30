const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
  forename: { type: String, minlength: 3, maxlength: 20 },
  surname: { type: String, minlength: 3, maxlength: 30 },
  dateOfBirth: { type: Date },
  gender: { type: String, required: true, enum: ['Female', 'Male', 'Custom'], default: 'Custom' },
  about: { type: String, maxlength: 111 },
  photoURL: { type: String },
  countOfPosts: { type: Number, required: true, default: 0 },
  countOfLikes: { type: Number, required: true, default: 0 },
  countOfTestimonials: { type: Number, required: true, default: 0 },
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)