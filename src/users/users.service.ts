import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.prisma.user.create({
      data: {
        email,
        name,
        salt,
        password: hashedPassword,
      },
    });
  }

  async findUserById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        salt: true,
        RefreshToken: true,
      },
    });
  }
}
