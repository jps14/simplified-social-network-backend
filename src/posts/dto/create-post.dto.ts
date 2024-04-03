import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'This is a post',
    description: 'The post content',
  })
  @IsString()
  @MaxLength(280)
  @MinLength(3)
  post: string;
}
