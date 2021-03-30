const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')

const formatDate = require('../utils/formatDate')
const generateToken = require('../utils/generateToken')

const User = require('../models/user/user')
const Profile = require('../models/user/profile')

// <----- GET USERS (GET) ----->

const get_users_GET = async (req, res) => {
  try {
    const users = await User.find()

    console.log('Users has been successfully fetched')
    res.status(200).json({ data: users, message: 'Users has been successfully fetched' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// <----- HANDLE REGISTRATION (POST) ----->

const registration_POST = async (req, res) => {
  const { username, password, gender } = req.body
  const existingUsername = await User.findOne({ username }, { username: 1 })

  if (!username || !password || !gender) {
    return res.status(400).json({ message: 'All fields required' })
  }

  if (existingUsername) {
    return res.status(409).json({ message: 'Username is already existed' })
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashPassword })
  const profile = new Profile({ user: user._id, username, gender })

  try {
    await profile.save()
    await user.save()
    await User.updateOne({ 'username': username }, { $set: { 'profile': profile._id }})

    const token = generateToken({ username, gender })
    const encryptedToken = cryptojs.AES.encrypt(token, process.env.SECRET_KEY).toString()

    console.log('Registration has been successfully completed')
    res
      .status(201)
      .json({ 
        status: 201,
        token: encryptedToken, 
        user: {
          username,
          gender
        }, 
        message: 'Registration has been successfully completed'
      })
  } catch (err) {
    console.log('Registration Error -->', err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// <----- HANDLE LOG IN (POST) ----->

const logIn_POST = async (req, res) => {
  console.log('Log in request body -->', req.body)
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username }).populate('profile')
    
    if (!user) {
      return res.status(200).json({ status: 400, message: 'User doesn\'t exist' })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(200).json({ status: 401, message: 'Incorrect Password' })
    }

    const { _id, gender } = user.profile
    // const formattedBirthdate = formatDate(new Date(dateOfBirth), 'yyyy-MM-dd').toString()

    const token = generateToken({ _id, username, gender })
    const encryptedToken = cryptojs.AES.encrypt(token, process.env.SECRET_KEY).toString()
    
    console.log('Login has been succesfully finished')
    res
      .status(200)
      .json({ 
        status: 200,
        token: encryptedToken, 
        user: {
          _id,
          username,
          gender
        }, 
        message: 'Login has been succesfully finished'
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// <----- HANDLE AUTHENTICATION (GET) ----->

const authentication_GET = (req, res) => {
  const { _id, username, gender } = req.user.data
  // const formattedBirthdate = formatDate(new Date(dateOfBirth), 'yyyy-MM-dd').toString()

  try {
    console.log('Authorized')
    res
      .status(200)
      .json({
        user: {
          _id,
          username,
          gender
        }
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = { get_users_GET, logIn_POST, registration_POST, authentication_GET }