import { createStore } from 'redux'

const USER_INFO = {
  userRole: 0,
  userView: false
}

function changeUserRole( state = USER_INFO, action ){
  switch (action.type){
    case 'CHANGE_ROLE_USER':
      return { ...state, userRole: action.value }
    case 'CHANGE_VIEW_USER':
      return { ...state, userView: action.value }
    default:
      return state
  }
}

const store = createStore( changeUserRole )

export default store