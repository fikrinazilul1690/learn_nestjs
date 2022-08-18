import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { BooksService } from './books.service';

@Module({
  imports: [PrismaModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
