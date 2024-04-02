import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/validations/decorators/match.decorator';

export class CreateUserDto {
  @ApiProperty({
    example: 'jonhdoe',
    description: 'The username of the User',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(12)
  username: string;

  @ApiProperty({
    example: 'jonhdoe@gmail.com',
    description: 'The email of the User',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '@Jonhpassword2',
    description: 'The password of the User',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: '@Jonhpassword2',
    description: 'The password confirmation of the User',
  })
  @Match('password', {
    message: 'Password confirmation must match password',
  })
  confirm_password: string;

  @ApiProperty({
    example: 'Jonh Doe',
    description: 'The name of the User',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
