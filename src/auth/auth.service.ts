import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly token: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.usersService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }

    const access_token = await this.token.createAccessToken(user);
    const refresh_token = await this.token.createRefreshToken(user);
    return { access_token, refresh_token } as LoginResponse;
  }

  async refreshAccessToken(
    refreshAccessTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    const { refresh_token } = refreshAccessTokenDto;
    const payload: { jid: string } = await this.token.decodeToken(
      refresh_token,
    );
    const refreshToken = await this.refreshTokenService.findOne(payload.jid);

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is not found');
    }

    if (refreshToken.isRevoked) {
      throw new UnauthorizedException('Refresh token has been revoked');
    }

    const access_token = await this.token.createAccessToken(refreshToken.user);

    return { access_token };
  }
}
