import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
