import React, { useState } from 'react'
import { actionTypes } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'
import axios from '../../config/axios'

import { Spinner } from '../../helpers/svg'
import './SignIn.css'

import handleElem from '../../utils/handleElem'

function SignIn() {
  const { dispatch } = useStateValue()
  const [input, setInput] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState('')

  // Function to log in
  const handleLogIn = async (e) => {
    e.preventDefault()

    if (!input.username) {
      return setWarning('Enter a username')
    }

    if (!input.password) {
      return setWarning('Enter a password')
    }

    setLoading(true)

    let res = await axios.post('/api/accounts/signin', {
      username: input.username,
      password: input.password
    })

    if (res.data.status === 200) {
      localStorage.setItem('user', `Bearer ${res.data.token}`)
      dispatch({ type: actionTypes.INIT, user: res.data.user })
      setInput({ username: '', password: '' })
    }

    setLoading(false)
    setWarning(res.data.message)
  }

  return (
    <div className='signIn'>
      {/* <--------------- Sign In Form ---------------> */}
      <form onSubmit={(e) => handleLogIn(e)} className='signIn__form'>
        <label className='signIn__formLabel'>SIGN IN</label>
        <input 
          type='text' 
          name='username' 
          placeholder='Username'
          value={input.username} 
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
        />
        <input 
          type='password' 
          name='password' 
          placeholder='Password'
          value={input.password} 
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
        />
        <p className='signIn__warning'>{warning}</p>
        <button type='submit' className='signIn__submitBtn'>
          {loading ? <Spinner className='spinner' /> : 'SIGN IN' }
        </button>
      </form>
      
      <p>Don't have an acccount? 
        <span onClick={() => handleElem('.signUp', '.signIn')}> Sign Up</span>
      </p>
    </div>
  )
}

export default SignIn
