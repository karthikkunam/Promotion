import { BaseController } from "./base.controller";
import { loginService } from "../services/login.service.js";
const _ = require('lodash');

class LoginController extends BaseController {
    constructor() {
        super();

        this.getTokenController = async (req, res, next) => {
            try {
                const { uuid } = req.params;

                let response = await loginService.getToken(uuid);
                res.status(200).send(response);
                console.log("TOKEN----------------->", response);
            } catch (error) {
                res.status(500).send({
                    message: "Server error while getting Token"
                });
            }
        }

        this.validateTokenController = async (req, res, next) => {
            try {
                let response = await loginService.getTokenValidate();
                res.status(200).send(response);
            } catch (error) {
                res.status(500).send({
                    message: "Server error while validating the Token"
                });
            }
        }

    }
}

let loginController = new LoginController();

export { loginController };
