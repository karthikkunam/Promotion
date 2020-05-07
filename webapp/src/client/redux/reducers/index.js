import { combineReducers } from 'redux'
import storeOffers from './storeOffers'
import login from './login'
import session from './session'

export default combineReducers({
    storeOffers: storeOffers,
    login: login,
    session: session
})
