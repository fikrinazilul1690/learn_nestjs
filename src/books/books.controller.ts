import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from '@prisma/client';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  private booksService: BooksService;
  constructor(booksService: BooksService) {
    this.booksService = booksService;
  }

  @Get()
  getBooks(@Query() filter: FilterBookDto, @GetUser() user: User) {
    console.log(user);
    return this.booksService.books(filter);
  }

  @Get(':id')
  getBook(@Param('id') id: string) {
    return this.booksService.book(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() payload: CreateBookDto) {
    return this.booksService.createBook(payload);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() payload: UpdateBookDto) {
    return this.booksService.updateBook(id, payload);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
