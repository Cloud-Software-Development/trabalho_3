import { PrismaClient, Document } from '@prisma/client';
import hasha from 'hasha';
import fs from 'fs';
import { v4 as uuid } from 'uuid';

import datastore from '../../config/datastore';

interface Request {
  path: string;
  id: number;
  motivation: string;
}

class ValidateDocumentService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async saveValidationData(
    document: Document,
    valid: boolean,
    motivation: string,
  ) {
    const validationKey = datastore.key(['validations', uuid()]);

    const validation = {
      key: validationKey,
      data: {
        documentId: document.id,
        valid: valid,
        motivation: motivation,
        timestamp: new Date(Date.now()).toISOString(),
      },
    };

    await datastore.save(validation);
  }

  public async execute({ id, path, motivation }: Request): Promise<boolean> {
    try {
      const hash = await hasha.fromFile(path, { algorithm: 'sha256' });
      const document = await this.prisma.document.findUnique({
        where: {
          id: id,
        },
      });
      fs.unlinkSync(path);
      if (document && hash === document.hash) {
        await this.saveValidationData(document, true, motivation);
        return true;
      } else if (document) {
        await this.saveValidationData(document, false, motivation);
        return false;
      } else {
        throw new Error('Documento não encontrado');
      }
    } catch (error) {
      console.error(error);
      fs.unlinkSync(path);
      throw new Error('Erro ao validar documento');
    }
  }
}

export default ValidateDocumentService;
