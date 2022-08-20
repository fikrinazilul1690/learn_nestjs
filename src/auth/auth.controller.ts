import { JwtAuthGuard } from './jwt-auth.guard';
import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  refreshToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ): Promise<{ access_token: string }> {
    return this.authService.refreshAccessToken(refreshAccessTokenDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/revoke')
  @HttpCode(204)
  revokeRefreshToken(@Param('id') id: string) {
    return this.authService.revokeRefreshToken(id);
  }
}
