import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TokenModule } from 'src/token/token.module';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    TokenModule,
    RefreshTokenModule,
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
