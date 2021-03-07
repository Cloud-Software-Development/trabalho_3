import { PrismaClient, User } from '@prisma/client';

interface Request {
  id: number;
  email: string;
  name: string;
  password: string;
  identification: string;
  nickname: string;
}

class UpdateUserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async checkEmail(email: string, id: number) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (user && user.id != id) {
      return true;
    }

    return false;
  }

  public async execute({
    email,
    name,
    password,
    identification,
    nickname,
    id,
  }: Request): Promise<User> {
    const emailExists = await this.checkEmail(email, id);

    if (emailExists) {
      throw new Error('Email já cadastrado no sistema');
    }
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name,
          email,
          password,
          identification,
          nickname,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao atualizar usuário');
    }
  }
}

export default UpdateUserService;
