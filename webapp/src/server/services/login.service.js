import { BaseService, api } from "./base.service";
const { GET, AUTH_SERVICE_URI } = require('../util/app.constants');

class LoginService extends BaseService {

    constructor() {
        super();

        this.getTokenFromHeader = (uuid) => ({
            url: `${AUTH_SERVICE_URI}/7boss/promo/auth/${uuid}`,
            method: GET,
            json: true,
        });

        this.getToken = (uuid) => api(this.getTokenFromHeader(uuid));

        this.getTokenValid= () => ({
            url: `${AUTH_SERVICE_URI}/7boss/promo/auth/validate`,
            Authorization: req.headers['authorization'],
            method: GET,
            json: true,
        });

        this.getTokenValidate = () => api(this.getTokenValid());

    }
}

let loginService = new LoginService();

export { loginService };
