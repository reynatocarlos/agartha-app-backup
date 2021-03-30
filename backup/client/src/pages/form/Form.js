import React from 'react'

import { SignIn, SignUp } from '../../helpers/components'
import { BrandLogo } from '../../helpers/svg'
import './Form.css'

function Form() {
  return (
    <section className='form'>
      <div className='form__hero'>
        <BrandLogo className='brand-logo' />
        <h1 className='form__brandName'>AGARTHA</h1>
        <p>You are not alone. Let's talk</p>
      </div>

      <SignIn />
      <SignUp />
    </section>
  )
}

export default Form
