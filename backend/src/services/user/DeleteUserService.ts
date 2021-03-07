import { PrismaClient } from '@prisma/client';
import DeleteDocumentService from '../document/DeleteDocumentService';
import DeleteTelephoneService from '../telephone/DeleteTelephoneService';

interface Request {
  id: number;
}

class DeleteUserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async execute({ id }: Request): Promise<string> {
    const telephoneService = new DeleteTelephoneService(this.prisma);
    const documentService = new DeleteDocumentService(this.prisma);

    try {
      const telephones = await this.prisma.telephone.findMany({
        where: {
          userId: id,
        },
      });

      for (const telephone of telephones) {
        await telephoneService.execute({ id: telephone.id });
      }

      const documents = await this.prisma.document.findMany({
        where: {
          userId: id,
        },
      });

      for (const document of documents) {
        await documentService.execute({ id: document.id });
      }

      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return 'Usuário deletado com sucesso';
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao deletar usuário');
    }
  }
}

export default DeleteUserService;
