import { PrismaClient, Document } from '@prisma/client';
import datastore from '../../config/datastore';

interface Request {
  id: number;
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

  public async execute({ id }: Request): Promise<Response> {
    try {
      const document = await this.prisma.document.findUnique({
        where: {
          id: id,
        },
      });

      if (!document) {
        throw new Error('Documento não existe');
      }

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

      const response = { ...document, sucessed, failed };

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao ler documentos');
    }
  }
}

export default ReadDocumentService;
