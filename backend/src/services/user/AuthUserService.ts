import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';

interface Request {
  email: string;
  password: string;
}

interface Response extends User {
  token: string;
}

class AuthUserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          Document: true,
          Telephone: true,
        },
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      let userResult;

      if (user.password === password) {
        const token = jwt.sign(
          { email },
          process.env.SECRET ? process.env.SECRET : '',
          {
            expiresIn: 86400,
          },
        );

        userResult = {
          ...user,
          token,
        };
      } else {
        throw new Error('Senha inválida');
      }
      return userResult;
    } catch (error) {
      console.error(error);
      switch (error.message) {
        case 'Usuário não encontrado':
          throw new Error('Usuário não encontrado');
        case 'Senha inválida':
          throw new Error('Senha inválida');
        default:
          throw new Error('Erro ao autenticar usuário');
      }
    }
  }
}

export default AuthUserService;
