import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User, ttl: number) {
    const expiredAt = new Date();
    expiredAt.setTime(expiredAt.getTime() + ttl);
    const create = await this.prisma.refreshToken.create({
      data: {
        expiredAt,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return create;
  }

  async findOne(id: string) {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return refreshToken;
  }
}
