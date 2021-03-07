import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/', UserController.read);
userRouter.get('/:id', UserController.readUnique);
userRouter.post('/auth', UserController.auth);
userRouter.post('/', UserController.create);
userRouter.put('/:id', UserController.update);
userRouter.delete('/:id', UserController.delete);

export default userRouter;
