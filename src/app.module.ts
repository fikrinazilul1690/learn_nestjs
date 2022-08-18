import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    BooksModule,
    UsersModule,
    PrismaModule,
    TestModule,
    AuthModule,
    RefreshTokenModule,
    TokenModule,
  ],
})
export class AppModule {}
