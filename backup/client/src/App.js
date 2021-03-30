import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useStateValue } from './context/StateProvider'
import { actionTypes } from './context/reducer'
import axios from './config/axios'

import { Feed, Form, Navigation } from './helpers/components'
import { Spinner } from './helpers/svg'
import './App.css';

import { feedScroll } from './utils/feedScroll'

function App() {
  const { state, dispatch } = useStateValue()

  useEffect(() => {
    window.addEventListener('scroll', feedScroll)

    return () => window.removeEventListener('scroll', feedScroll)
  }, [])

  useEffect(async () => {
    let res = await axios.get('/api/accounts/auth', { headers: { 'authorization': localStorage.getItem('user')}})

    if (res.status === 200) {
      dispatch({ type: actionTypes.INIT, user: res.data.user })
    }
  }, [])

  return (
    <main className='app'>
      {!state.isLogIn ? <Form /> : (
        <>
          {!state.isAuthenticate ? <Spinner className='spinner' /> : (
            <>
              <Navigation />

              <div className='app__home'>
                <Router history={createBrowserHistory} >
                  <Route exact path='/' render={() => <Feed />} />
                  <Route path='/home' render={() => <Feed />} />
                </Router>
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default App;
