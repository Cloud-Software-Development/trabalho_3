import { Router } from 'express';
import DocumentController from '../controllers/DocumentController';
import upload from '../config/upload';

const documentRouter = Router();

documentRouter.get('/', DocumentController.read);
documentRouter.get('/:id', DocumentController.readUnique);
documentRouter.post(
  '/validate/:id',
  upload.single('file'),
  DocumentController.validate,
);
documentRouter.post('/', upload.single('file'), DocumentController.create);
documentRouter.put('/:id', upload.single('file'), DocumentController.update);
documentRouter.delete('/:id', DocumentController.delete);

export default documentRouter;
