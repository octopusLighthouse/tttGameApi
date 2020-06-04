import { IsInt } from 'class-validator';

export class BoardBoxIdDto {
  @IsInt()
  id: number;
}