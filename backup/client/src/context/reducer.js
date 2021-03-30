const actionTypes = {
  INIT: 'INIT',
  SET_PAGE_LABEL: 'SET_PAGE_LABEL'
}

const initialState = {
  isLogIn: localStorage.getItem('user') ? true : false,
  isAuthenticate: false,
  user: null,
  pageLabel: 'Feed'
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return {
        ...state,
        isAuthenticate: true,
        isLogIn: true,
        user: action.user
      }
    case actionTypes.SET_PAGE_LABEL:
      return {
        ...state,
        pageLabel: action.pageLabel
      }
    default:
      return state
  }
}

export { actionTypes, initialState, reducer }