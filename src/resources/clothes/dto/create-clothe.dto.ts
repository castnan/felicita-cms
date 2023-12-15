import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,Min } from 'class-validator';
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateClotheDto  {
  @IsNotEmpty({ message: i18nValidationMessage("validation.isNotEmptySizeClothe") })
  @ApiProperty()
  @Min(1, {
    message: i18nValidationMessage(
      "validation.invalidSizeClotheLength",
    ),
  })
  sizeId: number;

  code:string;

  @IsNotEmpty({ message: i18nValidationMessage("validation.isNotEmptyNumberClothing") })
  @ApiProperty()

  number: number;
  @IsNotEmpty({ message: i18nValidationMessage("validation.isNotEmptyClothingEntryValue")})
  @ApiProperty()
  entryValue: number;

  
  @ApiProperty()
  outputValue: number;

  @IsNotEmpty({ message:i18nValidationMessage("validation.isNotEmptyDescClothing") })
  @ApiProperty()
  description: string;

  @IsNotEmpty({ message:i18nValidationMessage("validation.isNotEmptyDescClothing")  })
  @ApiProperty()
  isCurated: boolean;
  @ApiProperty()
  partnersId:number;
}
