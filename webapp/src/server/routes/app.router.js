import { Router } from "express";
import * as express from 'express';
import itemsRoutes from './items.router';
import storeOffersRoutes from './storeOffers.router';
import loginRoutes from './login.router';

let router = express.Router();

let routes = [itemsRoutes, storeOffersRoutes, loginRoutes];

routes.forEach(route => {

    router.use('/services', route);

});


export default router;
