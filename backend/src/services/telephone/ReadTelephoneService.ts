import { PrismaClient, Telephone } from '@prisma/client';

class ReadTelephoneService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async execute(): Promise<Telephone[]> {
    try {
      const telephones = await this.prisma.telephone.findMany();
      return telephones;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao ler telefones');
    }
  }
}

export default ReadTelephoneService;
