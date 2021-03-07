import { Request, Response } from 'express';
import prisma from '../config/database';

import DeleteDocumentService from '../services/document/DeleteDocumentService';
import ReadDocumentService from '../services/document/ReadDocumentService';
import UpdateDocumentService from '../services/document/UpdateDocumentService';
import CreateDocumentService from '../services/document/CreateDocumentService';
import ValidateDocumentService from '../services/document/ValidateDocumentService';
import ReadUniqueDocumentService from '../services/document/ReadUniqueDocumentService';

class DocumentController {
  public async read(request: Request, response: Response): Promise<Response> {
    const { user } = request.query;
    const service = new ReadDocumentService(prisma);
    try {
      const filter = {
        userId: user ? Number(user) : undefined,
      };
      const documents = await service.execute(filter);
      return response.json({ documents: documents });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async readUnique(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const service = new ReadUniqueDocumentService(prisma);
    try {
      const filter = {
        id: Number(id),
      };
      const document = await service.execute(filter);
      return response.json({ document });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;
    const file = request.file;
    const service = new CreateDocumentService(prisma);
    try {
      const document = await service.execute({
        path: file.path,
        filename: file.originalname,
        userId: Number(userId),
      });
      return response.status(201).json({ document: document });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    let { filename } = request.body;

    const file = request.file;
    if (file) {
      filename = file.originalname;
    }

    const service = new UpdateDocumentService(prisma);
    try {
      const document = await service.execute({
        id: Number(id),
        path: file ? file.path : undefined,
        filename: filename,
      });
      return response.json({ document: document });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = new DeleteDocumentService(prisma);
    try {
      const deleted = await service.execute({
        id: Number(id),
      });
      return response.json({ message: deleted });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async validate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { motivation } = request.body;
    const file = request.file;
    const service = new ValidateDocumentService(prisma);
    try {
      const valid = await service.execute({
        id: Number(id),
        path: file.path,
        motivation,
      });
      return response.status(201).json({ valid });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new DocumentController();
