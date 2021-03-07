import { PrismaClient, User } from '@prisma/client';

interface Request {
  id: number;
}

class ReadUserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async execute({ id }: Request): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          Document: true,
          Telephone: true,
        },
      });

      if (!user) {
        throw new Error('Não existe esse usuário');
      }

      return user;
    } catch (error) {
      console.error(error);
      switch (error.message) {
        case 'Não existe esse usuário':
          throw new Error('Não existe esse usuário');
        default:
          throw new Error('Erro ao ler usuário');
      }
    }
  }
}

export default ReadUserService;
