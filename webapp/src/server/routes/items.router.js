import * as express from 'express';
import { itemsController } from '../controller/items.controller';

let itemsRoutes = express.Router();

itemsRoutes.post('/getItemNames/:storeId', itemsController.getItemNamesController);

export default itemsRoutes;
