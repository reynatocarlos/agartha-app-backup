const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  status: { type: String, required: true, enum: ['active', 'deactivated', 'deleted'], default: 'active' },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 20 },
  password: { type: String, required: true },
  fullName: { type: String, minlength: 5, maxlength: 30 }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('User', userSchema)