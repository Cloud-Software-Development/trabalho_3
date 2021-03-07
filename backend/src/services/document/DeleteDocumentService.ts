import { PrismaClient } from '@prisma/client';
import datastore from '../../config/datastore';
import storage from '../../config/storage';

interface Request {
  id: number;
}

class DeleteDocumentService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async execute({ id }: Request): Promise<string> {
    try {
      const document = await this.prisma.document.findUnique({
        where: {
          id: id,
        },
      });

      if (document) {
        const documentQuery = datastore
          .createQuery('validations')
          .filter('documentId', '=', document.id);
        const [validations] = await datastore.runQuery(documentQuery);

        for (const validation of validations) {
          await datastore.delete(validation[datastore.KEY]);
        }

        await storage.file(document.storageName).delete();
        await this.prisma.document.delete({
          where: {
            id: id,
          },
        });
        return 'Documento deletado com sucesso';
      } else {
        throw new Error('Documento não encontrado');
      }
    } catch (error) {
      console.error(error);

      switch (error.message) {
        case 'Documento não encontrado':
          throw new Error('Documento não encontrado');

        default:
          throw new Error('Erro ao deletar documento');
      }
    }
  }
}

export default DeleteDocumentService;
