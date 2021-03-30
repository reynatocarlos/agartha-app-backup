import React,{ useEffect, useState } from 'react'
import { useStateValue } from '../../context/StateProvider'
import axios from '../../config/axios'

import { DeletePostModal, Post } from '../../helpers/components'
import { Spinner } from '../../helpers/svg'
import './Feed.css'

import formatDate from '../../utils/formatDate'

function Feed() {
  const { state } = useStateValue()
  const [posts, setPosts] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [createPost, setCreatePost] = useState({ 
    category: 'None',
    content: '', 
    placeholder: 'Anything you\'d like to share?' 
  })

  useEffect(async () => {
    if (state.user) {
      let res = await axios.get(`/api/feed/query?index=1&limit=4&user=${state.user?._id}`)

      if (res.status === 200) {
        setPosts(res.data.posts)
        setLoading(false)
      }

      console.log('User -->', state.user)
      console.log('Posts data -->', res.data.posts) 
    }
  }, [])

   // <----- Function to create post ----->

  const handleCreatePost = async (e) => {
    e.preventDefault()

    let res = await axios.post('/api/feed/post/create', {
      category: createPost.category,
      author: state.user._id,
      content: createPost.content
    })

    if (res.status === 201) {
      console.log('Response -->', res.data)
      
      setPosts([ 
        ...posts, 
        {
          _id: res.data.post._id,
          category: createPost.category,
          author: { username: state.user.username },
          content: createPost.content,
          countOfLikes: 0,
          countOfComments: 0,
          isLike: false,
          updatedAt: res.data.post.updatedAt
        } 
      ])

      console.log('Posts data -->', posts) 
    }

    setCreatePost({ category: 'None', content: '', placeholder: 'Anything you\'d like to share?' })
  }

  return (
    <section className='feed'>
      {isLoading ? <Spinner id='spin' className='spinner' /> : (
        <>
          {/* <--------------- Create Post Form ---------------> */}
          <form onSubmit={(e) => handleCreatePost(e)} className='feed__createPost'>
          <section className='profilePhoto'></section>
          
          <input 
            type='text' 
            name='content' 
            placeholder={createPost.placeholder}
            value={createPost.content} 
            onChange={(e) => setCreatePost({ ...createPost, [e.target.name]: e.target.value })}
            className='asd'
          />

          <button type='submit' disabled={!createPost.content}>Post</button>
        </form>

        {/* <--------------- Posts ---------------> */}
        <div className='feed__posts'>
          {posts?.map(({ _id, category, author, content, countOfLikes, countOfComments, isLike, updatedAt }) => (
            <Post 
              key={_id} 
              id={_id}
              category={category}
              author={author?.username}
              photoURL={author?.photoURL}
              content={content}
              countOfLikes={countOfLikes}
              countOfComments={countOfComments} 
              isLike={isLike}
              updatedAt={formatDate(new Date(updatedAt))}
            />
          ))}
        </div>
        </>
      )}
    </section>
  )
}

export default Feed
