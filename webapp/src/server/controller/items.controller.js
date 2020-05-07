import { BaseController } from "./base.controller";
import { itemsService } from "../services/items.service.js";
const _ = require('lodash');

class ItemsController extends BaseController {
    constructor() {
        super();

        this.getItemNamesController = async (req, res, next) => {
            try {
                const { storeId } = req.params;
                const { filters: { itemIds } } = req.body;

                let response = await itemsService.getItemNames(storeId, itemIds);
                res.status(200).send(response);
            } catch (error) {
                res.status(500).send({
                    message: "Server error while getting Item Names"
                });
            }
        }
    }
}

let itemsController = new ItemsController();

export { itemsController };
