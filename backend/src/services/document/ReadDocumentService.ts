import { PrismaClient, Document } from '@prisma/client';
import datastore from '../../config/datastore';

interface Request {
  userId?: number;
}

interface Response extends Document {
  sucessed: any[];
  failed: any[];
}

class ReadDocumentService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async execute({ userId }: Request): Promise<Response[]> {
    try {
      let documents;

      if (userId) {
        documents = await this.prisma.document.findMany({
          where: {
            userId: userId,
          },
        });
      } else {
        documents = await this.prisma.document.findMany();
      }

      const response: Response[] = [];

      for (const document of documents) {
        const sucessedQuery = datastore
          .createQuery('validations')
          .filter('documentId', '=', document.id)
          .filter('valid', '=', true);

        const failedQuery = datastore
          .createQuery('validations')
          .filter('documentId', '=', document.id)
          .filter('valid', '=', false);

        const [sucessed] = await datastore.runQuery(sucessedQuery);
        const [failed] = await datastore.runQuery(failedQuery);

        response.push({ ...document, sucessed, failed });
      }

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao ler documentos');
    }
  }
}

export default ReadDocumentService;
