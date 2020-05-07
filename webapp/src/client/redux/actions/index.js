import * as types from '../constants/actionTypes';
import axios from 'axios';
import BffRoute from '../../api/bffRoute';
import { getUserDetails } from '../../components/utility/user';


export const LoginReducer = payload => {
  return (dispatch) => {
    const userDetails = getUserDetails(payload.token);
    dispatch({
      type: types.LOGIN,
      payload:{...payload, userName: userDetails.fullName},
    })
  }
}

export const getStoreOffers = () => async dispatch => {
  dispatch({ type: types.API_CALL_STATUS, payload: "PENDING" })
  await BffRoute().get(`${types.BASE_SERVICE_URI}/store-offers`).then((response) => {
    dispatch({ type: types.STORE_OFFERS, payload: response.data })
    dispatch({ type: types.API_CALL_STATUS, payload: "COMPLETE" })
  })
    .catch(function (error) {
      dispatch({ type: types.API_CALL_STATUS, payload: "NETWORK_ERROR" });
    })
}

export const getStoreOffersDetails = (offerId) => async dispatch => {
  dispatch({ type: types.API_CALL_STATUS, payload: "PENDING" })
  await BffRoute().get(`${types.BASE_SERVICE_URI}/store-offers/${offerId}`).then((response) => {
      // let offerDetail;
      // response.data.map(function (element) {
      //   if (element.offer_id === offerId) {
      //     offerDetail = element
      //   }
      // });
      // dispatch({ type: types.STORE_OFFERS_DETAILS, payload: offerDetail })
      dispatch({ type: types.STORE_OFFERS_DETAILS, payload: response.data })
      dispatch({ type: types.API_CALL_STATUS, payload: "COMPLETE" })
    })
    .catch(function (error) {
      dispatch({ type: types.API_CALL_STATUS, payload: "NETWORK_ERROR" });
    })
}

export const getItemNames = (storeId, body) => async dispatch => {
  dispatch({ type: types.API_CALL_STATUS, payload: "PENDING" })
  await BffRoute().post(`${types.BASE_SERVICE_URI}/getItemNames/${storeId}`, {"filters": { "itemIds": body }}).then((response) => {
    dispatch({ type: types.ITEM_NAMES, payload: response.data })
    dispatch({ type: types.API_CALL_STATUS, payload: "COMPLETE" })
  })
    .catch(function (error) {
      dispatch({ type: types.API_CALL_STATUS, payload: "NETWORK_ERROR" });
    })
}

export const updatePromotion = (body) => async dispatch => {
    console.log('Starting API call')
    dispatch({ type: types.API_CALL_STATUS, payload: "PENDING" })
    await axios.post(`${types.BASE_SERVICE_URI}/updatePromotion`, body).then((response) => {
      dispatch({ type: types.UPDATE_PROMOTION, payload: response.data })
      dispatch({ type: types.API_CALL_STATUS, payload: "COMPLETE" })
    })
      .catch(function (error) {
        dispatch({ type: types.API_CALL_STATUS, payload: "NETWORK_ERROR" });
      })
}

export const action = payload => {
  return (dispatch) => {
    dispatch({ type: types[payload.type] })

  }
}
