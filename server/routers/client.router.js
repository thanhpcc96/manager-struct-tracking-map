import {Router} from 'express';
import {authLocal} from '../services/authClient';
import * as ClientController from '../controllers/client.controller';


const route = new Router();

route.post('/register',ClientController._postRegister);


route.post('/login', authLocal, ClientController._postLogin);

export default route;