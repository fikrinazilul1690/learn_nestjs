import { Injectable, NotFoundException } from '@nestjs/common';
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
    const findRefreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return findRefreshToken;
  }

  async revoke(id: string) {
    const refreshToken = await this.findOne(id);
    if (!refreshToken) {
      throw new NotFoundException();
    }
    return await this.prisma.refreshToken.update({
      where: {
        id: refreshToken.id,
      },
      data: {
        isRevoked: true,
      },
    });
  }
}
