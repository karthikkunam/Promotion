import { BaseService, api } from "./base.service";
const { POST, ITEM_SERVICE_URI, X_API_KEY } = require('../util/app.constants');
// import { BaseResponse } from "../models/common/base.response";

class ItemsService extends BaseService {

    constructor() {
        super();

        this.getItemsOptions = (storeId, itemIds) => ({
            url: `${ITEM_SERVICE_URI}/stores/${storeId}/items/search`,
            method: POST,
            headers: {
                'x-api-key': X_API_KEY
            },
            body: {
                filters: {
                    itemIds
                }
            },
            json: true,
        });

        this.getItemNames = (storeId, itemIds) => api(this.getItemsOptions(storeId, itemIds));

    }
}

let itemsService = new ItemsService();

export { itemsService };
