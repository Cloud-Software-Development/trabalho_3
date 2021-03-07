import { PrismaClient } from '@prisma/client';

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
      await this.prisma.telephone.delete({
        where: {
          id: id,
        },
      });
      return 'Telefone deletado com sucesso';
    } catch (error) {
      throw new Error('Erro ao deletar telefone');
    }
  }
}

export default DeleteDocumentService;
