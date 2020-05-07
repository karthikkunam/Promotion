import { combineReducers } from 'redux'
import { HOME, STORE_OFFERS, STORE_OFFERS_DETAILS, UPDATE_PROMOTION, ITEM_NAMES } from '../constants/actionTypes'

const INITIAL_STATE = {};

const getStoreOffers = (state = {}, action) => {
  switch (action.type) {
    case STORE_OFFERS:
      return {
        ...state,
        ...action
      }
      case HOME:
        return INITIAL_STATE
      default:
        return state
  }
}

const getStoreOffersDetails = (state = {}, action) => {
  switch (action.type) {
    case STORE_OFFERS_DETAILS:
      return {
        ...state,
        ...action
      }
      case HOME:
        return INITIAL_STATE
      default:
        return state
  }
}

const updatePromotion = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROMOTION:
      return {
        ...state,
        ...action
      }
      case HOME:
        return INITIAL_STATE
      default:
        return state
  }
}

const getItemNames = (state = {}, action) => {
  switch (action.type) {
    case ITEM_NAMES:
      return {
        ...state,
        ...action
      }
      case HOME:
        return INITIAL_STATE
      default:
        return state
  }
}

export default combineReducers({
  getStoreOffers,
  getStoreOffersDetails,
  updatePromotion,
  getItemNames
})
