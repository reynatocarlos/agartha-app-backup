import React, { useEffect, useRef } from 'react'
import { createBrowserHistory } from 'history'
import { useStateValue } from '../../context/StateProvider'

import { BrandLogo } from '../../helpers/svg'
import { 
          AccountIcon,
          FilterIcon, 
          HomeIcon,
          LogOutIcon,
          MessageIcon, 
          NotificationIcon,
      } from '../../helpers/icons'
import './Navigation.css'

import { handleDropdown, keyExit, outsideClick } from '../../utils/handleDropdown'
import scrollTop from '../../utils/scrollTop'

function Navigation() {
  const history = createBrowserHistory()
  const { state } = useStateValue()
  const dropdownBtn = useRef()

  // Function to log out the user
  const handleLogOut = () => {
    localStorage.removeItem('user')
    history.push('/')
    window.location.reload()
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => keyExit(e, '.account__dropdownContent'))
    window.addEventListener('click', (e) => outsideClick(e, dropdownBtn, 'account__dropdownContent'))
    
    return () => {
      window.removeEventListener('keydown', keyExit)
      window.removeEventListener('click', outsideClick)
    }
  })
  
  return (
    <section className='navigation'>
      {/* <--------------- Navigation Brand Logo & Filter Button ---------------> */}
      <div>
        <BrandLogo className='navigation__brandLogo brand-logo' />
        <FilterIcon className='navigation__filterBtn icon-btn' />
      </div>

      {/* <--------------- Navigation Page Title ---------------> */}
      <label className='navigation__pageLabel'>{state.pageLabel}</label>

      {/* <--------------- Navigation Buttons ---------------> */}
      <div className='navigation__btns'>
        <HomeIcon 
          onClick={scrollTop} 
          className='icon-btn' 
        />
        <MessageIcon 
          className='icon-btn' 
        />
        <NotificationIcon 
          className='icon-btn' 
        />

        <div className='navigation__accountDropdown'>
          <AccountIcon 
            ref={dropdownBtn}
            onClick={() => handleDropdown('.account__dropdownContent')}
            className='icon-btn' 
          />
          <ul className='account__dropdownContent'>
            <li>
              <AccountIcon className='icon' />
              <p>Profile</p>
            </li>
            <li onClick={handleLogOut} >
              <LogOutIcon className='icon' />
              <p>Log Out</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Navigation
