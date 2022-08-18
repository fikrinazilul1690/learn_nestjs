import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async book(id: string): Promise<Book | null> {
    return await this.prisma.book.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async books(filterBookDto: FilterBookDto): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: {
        title: {
          contains: filterBookDto.title,
        },
        author: {
          contains: filterBookDto.author,
        },
        category: {
          contains: filterBookDto.category,
        },
        year: {
          lte: filterBookDto.max_year,
          gte: filterBookDto.min_year,
        },
      },
    });

    if (books.length !== 0) {
      return books;
    } else {
      throw new NotFoundException();
    }
  }

  async createBook(data: CreateBookDto): Promise<Book> {
    return await this.prisma.book.create({
      data,
    });
  }

  async updateBook(id: string, data: UpdateBookDto): Promise<Book> {
    return await this.prisma.book.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteBook(id: string): Promise<Book> {
    return await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
