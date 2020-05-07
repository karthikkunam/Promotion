import * as express from 'express';
import { storeOffersController } from '../controller/storeOffers.controller';

let storeOffersRoutes = express.Router();

storeOffersRoutes.get('/store-offers', storeOffersController.getStoreOffersController);

storeOffersRoutes.get("/store-offers/:orderid", storeOffersController.getStoreOfferByIdController);

export default storeOffersRoutes;
