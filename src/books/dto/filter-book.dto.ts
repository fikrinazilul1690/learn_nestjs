import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class FilterBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsString()
  readonly category: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly min_year: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly max_year: number;
}
