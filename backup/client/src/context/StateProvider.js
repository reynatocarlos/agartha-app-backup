import { createContext, useContext, useReducer } from 'react'
import { reducer, initialState } from './reducer'

export const StateContext = createContext()

export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateValue = () => useContext(StateContext)