import { HasNames } from '@/common/decorators/has-two-names.decorator';
import { Role } from '@/common/enums/role.enum';
import { nameRegEx, userLoginRegEx } from '@/common/regex/regex';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, Length, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {

  @ApiProperty()
  @Matches(nameRegEx, { message:i18nValidationMessage("exeception.teste") })
  @Length(6, 50, { message:i18nValidationMessage("exeception.teste") })
  @HasNames(2, { message:i18nValidationMessage("exeception.teste") })
  fullName: string;

  @ApiProperty()
  @IsEmail({}, { message:i18nValidationMessage("exeception.teste") })
  email: string;

  @ApiProperty()
  @Matches(userLoginRegEx, { message:i18nValidationMessage("exeception.teste") })
  username: string;

  @ApiProperty()
  // @IsEnum(Role, { message: invalidRole })
   userRole: Role;

  @ApiProperty()
  password:string;

  @ApiProperty()
  partnersId:number;
}
