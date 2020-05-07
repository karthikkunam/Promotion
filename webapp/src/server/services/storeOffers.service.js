import { BaseService, api } from "./base.service";
const { GET, STOREOFFERS_SERVICE_URI, STOREOFFERDETAILS_SERVICE_URI } = require('../util/app.constants');
// import { BaseResponse } from "../models/common/base.response";

class StoreOffersService extends BaseService {

    constructor() {
        super();

        this.getStoreOffersOptions = () => ({
            url: `${STOREOFFERS_SERVICE_URI}/store-offers`,
            method: GET,
            json: true,
        });

        this.getStoreOffers = () => api(this.getStoreOffersOptions());

        this.getStoreOfferID = (offerid) => ({
            url: `${STOREOFFERDETAILS_SERVICE_URI}/store-offers/${offerid}`,
            method: GET,
            json: true,
        });

        this.getStoreOfferByID = () => api(this.getStoreOfferID());

    }
}

let storeOffersService = new StoreOffersService();

export { storeOffersService };
