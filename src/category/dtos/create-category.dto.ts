import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Computer programming',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
