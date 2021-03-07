import { PrismaClient, Telephone } from '@prisma/client';

interface Request {
  id: number;
  phone: string;
}

class UpdateTelephoneService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async execute({ id, phone }: Request): Promise<Telephone> {
    try {
      const telephone = await this.prisma.telephone.update({
        where: {
          id: id,
        },
        data: {
          phone: phone,
        },
      });

      return telephone;
    } catch (error) {
      console.error(error);
      throw new Error('Erro no sistema ao cadastrar usuário');
    }
  }
}

export default UpdateTelephoneService;
