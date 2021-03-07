import { Document, PrismaClient } from '@prisma/client';
import hasha from 'hasha';
import fs from 'fs';
import storage from '../../config/storage';
import { v4 as uuid } from 'uuid';

interface Request {
  path: string;
  userId: number;
  filename: string;
}

class CreateDocumentService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async checkUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      return true;
    }

    return false;
  }

  public async execute({ path, userId, filename }: Request): Promise<Document> {
    const userExists = await this.checkUser(userId);

    if (!userExists) {
      throw new Error('Usuário não foi encontrado no sistema');
    }

    try {
      const hash = await hasha.fromFile(path, { algorithm: 'sha256' });
      const splitedFilename = filename.split('.');
      const storageName =
        `${userId}/` +
        uuid() +
        '.' +
        splitedFilename[splitedFilename.length - 1];

      const storageResponse = await storage.upload(path, {
        destination: storageName,
      });

      const document = await this.prisma.document.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          hash: hash,
          filename: filename,
          storageId: storageResponse[1].id,
          storageName: storageName,
          selfLink: storageResponse[1].selfLink,
          mediaLink: storageResponse[1].mediaLink,
          contentType: storageResponse[1].contentType,
          timeCreated: storageResponse[1].timeCreated,
        },
      });
      fs.unlinkSync(path);
      return document;
    } catch (error) {
      console.error(error);
      fs.unlinkSync(path);
      throw new Error('Erro no sistema ao cadastrar documento');
    }
  }
}

export default CreateDocumentService;
