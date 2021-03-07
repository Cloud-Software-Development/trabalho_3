import { Document, PrismaClient } from '@prisma/client';
import hasha from 'hasha';
import storage from '../../config/storage';
import { v4 as uuid } from 'uuid';

interface Request {
  id: number;
  path?: string;
  filename: string;
}

class UpdateDocumentService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async execute({ id, path, filename }: Request): Promise<Document> {
    try {
      let document;
      if (path) {
        const hash = await hasha.fromFile(path, { algorithm: 'sha256' });
        const storageResponse = await storage.upload(path);
        const splitedFilename = filename.split('.');
        const storageName =
          uuid() + '.' + splitedFilename[splitedFilename.length - 1];
        document = await this.prisma.document.update({
          where: {
            id: id,
          },
          data: {
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
      } else {
        console.log(filename);
        document = await this.prisma.document.update({
          where: {
            id: id,
          },
          data: {
            filename: filename,
          },
        });
      }

      return document;
    } catch (error) {
      console.error(error);
      throw new Error('Erro no sistema ao cadastrar usuário');
    }
  }
}

export default UpdateDocumentService;
