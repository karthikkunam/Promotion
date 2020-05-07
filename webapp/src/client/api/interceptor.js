import axios from 'axios';
import store from '../index';
import * as types from '../redux/constants/actionTypes'

const createApiClient = (url) => {
    const instance = axios.create({
        baseURL: url
    });
    instance.interceptors.request.use((req) => requestHandler(req));
    instance.interceptors.response.use(response => successHandler(response), err => errorHandler(err));
    return instance;
}

const requestHandler = (req) => {
    const state = store.getState();
    let loginPayload = state.login;
    req.headers['content-type'] = 'application/json';
    req.headers['authorization'] = loginPayload.token;
    return req;
}

const successHandler = (response) => {
    return response;
}

const errorHandler = async (err) => {
    const { response } = err;
    console.log(err);
    if( response && response.status === 401){
        store.dispatch({ type: types.LOGIN, payload : false });
    }

}

export default createApiClient;