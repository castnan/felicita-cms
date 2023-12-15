import { passwordRegEx } from '@/common/regex/regex';
import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ChangeUserPasswordDto {
  @ApiProperty()
  @Matches(passwordRegEx, { message:i18nValidationMessage("exeception.IncorrectPassword") })
  user_password: string;
}
