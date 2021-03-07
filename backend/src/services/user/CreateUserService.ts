import { PrismaClient, User } from '@prisma/client';

interface Request {
  email: string;
  name: string;
  password: string;
  identification: string;
  nickname: string;
  admin: boolean;
}

class CreateUserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async checkEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
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
    admin,
  }: Request): Promise<User> {
    const emailExists = await this.checkEmail(email);
    if (emailExists) {
      throw new Error('Email já cadastrado no sistema');
    }

    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password,
          identification,
          nickname,
          admin,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao cadastrar usuário');
    }
  }
}

export default CreateUserService;
