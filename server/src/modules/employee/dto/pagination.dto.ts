import { IsNumber } from 'class-validator';

export class PaginationRequestDTO {
  @IsNumber()
  readonly take: number;

  @IsNumber()
  readonly skip: number;
}
