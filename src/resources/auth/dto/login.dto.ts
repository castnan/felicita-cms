import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'brecho@2023',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
