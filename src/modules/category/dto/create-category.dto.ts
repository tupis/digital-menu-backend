import { IsNumberOrString } from "@shared/decorators/is-string-or-number-validator";
import { IsString, Validate } from "class-validator";

export class CategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Validate(IsNumberOrString)
  pointOfSalesId: number | string;
}
