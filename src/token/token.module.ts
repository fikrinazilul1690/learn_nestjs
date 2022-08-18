import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';

@Module({
  imports: [JwtModule.register(jwtConfig), RefreshTokenModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
