import { Request, Response } from 'express';
import prisma from '../config/database';

import DeleteTelephoneService from '../services/telephone/DeleteTelephoneService';
import ReadTelephoneService from '../services/telephone/ReadTelephoneService';
import UpdateTelephoneService from '../services/telephone/UpdateTelephoneService';
import CreateTelephoneService from '../services/telephone/CreateTelephoneService';

class TelephoneController {
  public async read(request: Request, response: Response): Promise<Response> {
    const service = new ReadTelephoneService(prisma);
    try {
      const telephones = await service.execute();
      return response.json({ telephones: telephones });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, phone } = request.body;
    const service = new CreateTelephoneService(prisma);
    try {
      const telephone = await service.execute({
        userId: Number(userId),
        phone: phone,
      });
      return response.status(201).json({ telephone: telephone });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { phone } = request.body;
    const service = new UpdateTelephoneService(prisma);

    try {
      const telephone = await service.execute({
        id: Number(id),
        phone: phone,
      });
      return response.json({ telephone: telephone });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = new DeleteTelephoneService(prisma);
    try {
      const deleted = await service.execute({
        id: Number(id),
      });
      return response.json({ message: deleted });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new TelephoneController();
