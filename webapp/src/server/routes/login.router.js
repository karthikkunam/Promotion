import * as express from 'express';
import { loginController } from '../controller/login.controller';

let loginRoutes = express.Router();

loginRoutes.get('/:uuid', loginController.getTokenController);

loginRoutes.get("/validate", loginController.validateTokenController);

export default loginRoutes;
