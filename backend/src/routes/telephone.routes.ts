import { Router } from 'express';
import TelephoneController from '../controllers/TelephoneController';

const telephoneRouter = Router();

telephoneRouter.get('/', TelephoneController.read);
telephoneRouter.post('/', TelephoneController.create);
telephoneRouter.put('/:id', TelephoneController.update);
telephoneRouter.delete('/:id', TelephoneController.delete);

export default telephoneRouter;
