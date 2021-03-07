import { Router } from 'express';

import documentRouter from './document.routes';
import telephoneRouter from './telephone.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/document', documentRouter);
routes.use('/telephone', telephoneRouter);

export default routes;
