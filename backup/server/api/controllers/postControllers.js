const Profile = require('../models/user/profile')
const Post = require('../models/post/post')
const PostLike = require('../models/post/like')

// <----- GET POSTS (GET) ----->

const get_posts_GET = async (req, res) => {
  const { index, limit, user } = req.query

  try {
    const posts = await Post.find().sort({ 'updatedAt': -1 }).skip(parseInt(index - 1)).limit(parseInt(limit)).populate('author')
    const data = []

    const searchPostLike = async (post) => {
      let result = await PostLike.find({ post: post._id, whoLike: user })

      if (result.length !== 0) {
        data.push({ ...post._doc, isLike: true })
      } else {
        data.push({ ...post._doc, isLike: false })
      }
    }

    console.log('Posts has been successfully fetched')

    await Promise.all(posts.map(searchPostLike));
    res.status(200).json({ posts: data, message: 'Posts has been successfully fetched' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// <----- GET POST (GET) ----->

const get_post_GET = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findOne({ _id: id }).populate('author')

    console.log('Post has been successfully fetched')
    res.status(200).json({ post, message: 'Post has been succesfully fetched' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Server Error' })
  }
}

// <----- CREATE POST (POST) ----->

const create_post_POST = async (req, res) => {
  const { category, author, content } = req.body
  const post = new Post({ category, author, content  })

  try {
    await post.save()
    await Profile.updateOne({ _id: author }, { $inc: { 'countOfPosts': 1 }}, { $upsert: true })

    console.log('Post has been successfully created')
    res.status(201).json({ post, message: 'Post has been succesfully created' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// <----- UPDATE POST (PUT) ----->

const update_post_PUT = async (req, res) => {
  const { category, content } = req.body
  const { id } = req.params

  try {
    await Post.updateOne({ _id: id }, { $set: { 'category': category, 'content': content }})

    console.log('Post has been successfully updated')
    return res.status(200).json({ message: 'Post has been successfully updated' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// <----- DELETE POST (DELETE) ----->

const delete_post_DEL = async (req, res) => {
  const { author } = req.body
  const { id } = req.params

  try {
    await Post.deleteOne({ _id: id })
    await Profile.updateOne({ username: author }, { $inc: { 'countOfPosts': -1 }}, { $upsert: true })

    console.log('Post has been successfully deleted')
    return res.status(200).json({ message: 'Post has been successfully deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// <----- LIKE POST (GET) ----->

const like_post_GET = async (req, res) => {
  const { id } = req.params

  try {
    const postLike = await PostLike.findOne({ post: id })

    console.log('Post\'s likes has been successfully fetched')
    res.status(200).json({ postLike, message: 'Post\'s likes has been successfully fetched' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// <----- LIKE / DISLIKE POST (POST) ----->

const like_post_POST = async (req, res) => {
  const { id } = req.params
  const { whoLike } = req.body

  try {
    const user = await PostLike.findOne({ post: id, whoLike: whoLike })
    var status = null

    if (!user) {
      const postLike = new PostLike({ post: id, whoLike })
      await postLike.save()

      status = 1

      console.log('Post has been liked')
      res.status(200).json({ state: 'liked', message: 'Post has been liked' })
    } else {
      await PostLike.deleteOne({ post: id })

      status = -1

      console.log('Post has been disliked')
      res.status(200).json({ state: 'disliked', message: 'Post has been disliked' })
    }

    await Post.updateOne({ _id: id }, { $inc: { 'countOfLikes': status }})
    return
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = { 
  get_posts_GET, 
  create_post_POST, 
  get_post_GET,
  update_post_PUT, 
  delete_post_DEL, 
  like_post_GET, 
  like_post_POST,
}