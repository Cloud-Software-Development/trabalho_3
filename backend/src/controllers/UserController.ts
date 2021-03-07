import { Request, Response } from 'express';
import prisma from '../config/database';
import AuthUserService from '../services/user/AuthUserService';

import CreateUserService from '../services/user/CreateUserService';
import DeleteUserService from '../services/user/DeleteUserService';
import ReadUniqueUserService from '../services/user/ReadUniqueUserService';
import ReadUserService from '../services/user/ReadUserService';
import UpdateUserService from '../services/user/UpdateUserService';

class UserController {
  public async read(request: Request, response: Response): Promise<Response> {
    const service = new ReadUserService(prisma);
    try {
      const users = await service.execute();
      return response.json({ users });
    } catch (error) {
      return response.status(400).json({ error: error.message || error });
    }
  }

  public async readUnique(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const service = new ReadUniqueUserService(prisma);
    try {
      const filter = {
        id: Number(id),
      };
      const user = await service.execute(filter);
      return response.json({ user });
    } catch (error) {
      return response.status(400).json({ error: error.message || error });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      email,
      name,
      password,
      identification,
      nickname,
      admin,
    } = request.body;
    const service = new CreateUserService(prisma);
    try {
      const user = await service.execute({
        email,
        name,
        password,
        identification,
        nickname,
        admin: admin ? admin : false,
      });
      return response.status(201).json({ user });
    } catch (error) {
      return response.status(400).json({ error: error.message || error });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { email, name, password, nickname, identification } = request.body;
    const service = new UpdateUserService(prisma);
    try {
      const idNumber = Number(id);
      const user = await service.execute({
        id: idNumber,
        email,
        name,
        password,
        identification,
        nickname,
      });
      return response.json({ user });
    } catch (error) {
      return response.status(400).json({ error: error.message || error });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = new DeleteUserService(prisma);
    try {
      const idNumber = Number(id);
      const deleted = await service.execute({
        id: idNumber,
      });
      return response.json({ message: deleted });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message || error });
    }
  }

  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const service = new AuthUserService(prisma);

    try {
      const user = await service.execute({ email, password });
      return response.json({ user });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message || error });
    }
  }
}

export default new UserController();
