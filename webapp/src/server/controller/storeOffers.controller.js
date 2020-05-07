import { BaseController } from "./base.controller";
import { storeOffersService } from "../services/storeOffers.service.js";
const _ = require('lodash');

class StoreOffersController extends BaseController {
    constructor() {
        super();

        this.getStoreOffersController = async (req, res, next) => {
            try {
                let response = await storeOffersService.getStoreOffers();
                res.status(200).send(response);
            } catch (error) {
                res.status(500).send({
                    message: "Server error while getting Store Offers"
                });
            }
        }

        this.getStoreOfferByIdController = async (req, res, next) => {
            try {
                let response = await storeOffersService.getStoreOfferByID(req.params.offerid);
                res.status(200).send(response);
            } catch (error) {
                res.status(500).send({
                    message: "Server error while getting Store Offers by ID"
                });
            }
        }

    }
}

let storeOffersController = new StoreOffersController();

export { storeOffersController };
