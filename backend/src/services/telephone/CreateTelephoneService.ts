import { PrismaClient, Telephone } from '@prisma/client';

interface Request {
  userId: number;
  phone: string;
}

class CreateTelephoneService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async execute({ userId, phone }: Request): Promise<Telephone> {
    try {
      const telephone = await this.prisma.telephone.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          phone: phone,
        },
      });
      return telephone;
    } catch (error) {
      console.error(error);
      throw new Error('Erro no sistema ao cadastrar documento');
    }
  }
}

export default CreateTelephoneService;
