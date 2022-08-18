import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly author: string;

  @IsNotEmpty()
  readonly category: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  year: number;
}
