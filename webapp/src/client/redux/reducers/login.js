import { LOGIN } from '../constants/actionTypes'

const loginData = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default loginData
