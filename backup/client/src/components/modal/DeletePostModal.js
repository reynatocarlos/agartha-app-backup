import React from 'react'
import axios from '../../config/axios'

import './DeletePostModal.css'

function DeletePostModal({ id, author, setDelModalShow }) {
  // Function to delete the post
  const handleDel = async () => {
    let res = await axios.delete((`/api/feed/post/${id}`), { author })
      
    console.log('Handle like response -->', res)

    if (res.status === 200) {
      setDelModalShow(false)
    }
  }

  return (
    <div className='deletePostModal'>
      <div className='deletePostModal__container'>
        <header>
          <label className='deletePostModal__label'>Delete</label>
        </header>

        <section>
          <p>Are you sure you want to delete this post?</p>
        </section>

        <footer>
          <button 
            onClick={handleDel}
            className='deletePostModal__delBtn'>Delete</button>
          <button 
            onClick={() => setDelModalShow(false)} 
            className='deletePostModal__cancelBtn'
          >Cancel</button>
        </footer>
      </div>
    </div>
  )
}

export default DeletePostModal
