import { PrismaClient, User } from '@prisma/client';

class ReadUserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async execute(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        include: {
          Document: true,
          Telephone: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao ler usuários');
    }
  }
}

export default ReadUserService;
