import React, { useEffect, useRef, useState } from 'react'
import { useStateValue } from '../../context/StateProvider'
import axios from '../../config/axios'

import { DeletePostModal } from '../../helpers/components'
import { CommentIcon, EditIcon, HeartIcon, MoreIcon, StarIcon, TrashIcon  } from '../../helpers/icons'
import './Post.css'

import { handleDropdown, keyExit, outsideClick } from '../../utils/handleDropdown'
import truncate from '../../utils/truncate'

function Post({ id, category, author, photoURL, content, countOfLikes, countOfComments, isLike, updatedAt}) {
  const { state } = useStateValue()
  const [isDelModalShow, setDelModalShow] = useState(false)
  const [likeState, setLikeState] = useState(isLike)
  const [likesCount, setLikesCount] = useState(countOfLikes)
  const dropdownBtnRef = useRef()

  // Function to like the post
  const handleLikePost = async (isLike) => {
    if (state.user) {
      let res = await axios.post((`/api/feed/post/${id}/like`), { whoLike: state.user?._id })
      console.log('Handle like response -->', res.data)

      if (isLike) {
        setLikesCount(countOfLikes - 1)
        setLikeState(false)
      } else {
        setLikesCount(countOfLikes + 1)
        setLikeState(true)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => keyExit(e, '.post__dropdownContent'))
    // window.addEventListener('click', (e) => outsideClick(e, dropdownBtnRef, 'post__dropdownContent'))
    
    return () => {
      window.removeEventListener('keydown', keyExit)
      // window.removeEventListener('click', outsideClick)
    }
  })

  return (
    <div className='post'>
      {isDelModalShow && <DeletePostModal id={id} author={author} setDelModalShow={setDelModalShow} />}

      {/* <--------------- Header ---------------> */}
      <section className='post__header'>
        <div className='post__headerInfo'>
          <section className='post__profilePhoto profilePhoto'></section>

          <div>
            <h3 className='post__author'>{author}</h3>
            <p className='post__timestamps'>{updatedAt}</p>
          </div>
        </div>

        <div className='post__dropdown'>
          <MoreIcon 
            ref={dropdownBtnRef}
            onClick={() => handleDropdown(`#_${id}`)}
            className='icon-btn' 
          />

          <ul id={`_${id}`} className='post__dropdownContent'>
              <li>
                <EditIcon className='icon' />
                <p>Edit</p>
              </li>

              <li onClick={() => setDelModalShow(true)}>
                <TrashIcon className='icon' />
                <p>Delete</p>
              </li>
            </ul>
        </div>
      </section>

      {/* <--------------- Body ---------------> */}
      <section className='post__body'>
        <p className={`${content.length < 50 && 'post__content--large'} post__content`}>
          {truncate(content, 220)}
          {content?.length > 220 && <span>See More</span>}
        </p>

        <div className='post__bodyInfo'>
          <p>
            <span>{likesCount}</span>
            {likesCount > 1 ?  ' likes' : ' like'}
          </p>

          <p>
            <span>{countOfComments}</span>
            {countOfComments > 1 ? ' comments' : ' comment'}
          </p>
        </div>

        <p className='post__bodyInfo'></p>
      </section>

      {/* <--------------- Footer ---------------> */}
      <section className='post__footer'>
        <HeartIcon 
          onClick={() => handleLikePost(isLike)}
          className={`${likeState && 'liked'} react-btn icon-btn`} 
        />
        <StarIcon 
          className='react-btn icon-btn' 
        />
        <CommentIcon 
          className='icon-btn' 
        />
      </section>
    </div>
  )
}

export default Post
