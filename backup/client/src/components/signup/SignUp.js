import React, { useState } from 'react'
import { actionTypes } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'
import axios from '../../config/axios'

import { Spinner } from '../../helpers/svg'
import './SignUp.css'

import handleElem from '../../utils/handleElem'

function SignUp() {
  const { dispatch } = useStateValue()
  const [input, setInput] = useState({ username: '', password: '', confirmPassword: '', gender: 'Custom' })
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState('')

  // Function to register

  const handleRegistration = async (e) => {
    e.preventDefault()

    if (!input.username || !input.password || !input.confirmPassword) {
      return setWarning('All fields required')
    }
    
    if (input.password !== input.confirmPassword) {
      return setWarning('Password did not match')
    }

    setLoading(true)

    let res = await axios.post('/api/accounts/signup', {
      username: input.username,
      password: input.password,
      gender: input.gender
    })

    if (res.data.status === 201) {
      localStorage.setItem('user', `Bearer ${res.data.token}`)
      dispatch({ type: actionTypes.INIT, user: res.data.user })
      setInput({ username: '', password: '', gender: 'Custom' })
      window.location.reload()
    }

    setLoading(false)
    setWarning(res.data.message)
  }

  return (
    <div className='signUp'>
      {/* <--------------- Sign Up Form ---------------> */}
      <form onSubmit={(e) => handleRegistration(e)} className='signUp__form'>
        <label className='signUp__formLabel'>SIGN UP</label>
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
        <input 
          type='password' 
          name='confirmPassword' 
          placeholder='Confirm Password'
          value={input.confirmPassword} 
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
        />
        <div>
          <label htmlFor='gender'>Gender</label>
          <select id='gender' name='gender' onChange={(e) => setInput({ ...input, gender: e.target.value })}>
            <option value='Custom'>Custom</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <p className='signUp__warning'>{warning}</p>
        <button type='submit' className='signUp__submitBtn'>
          {loading ? <Spinner className='spinner' /> : 'SIGN UP' }
        </button>
      </form>
      
      <p>Already have an acccount? 
      <span onClick={() => handleElem('.signIn', '.signUp')}> Sign In</span>
      </p>
    </div>
  )
}

export default SignUp
