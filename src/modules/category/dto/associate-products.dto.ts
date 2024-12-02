import { IsNumberOrString } from "@shared/decorators/is-string-or-number-validator";
import { IsArray, Validate } from "class-validator";

export class AssociateProductsDto {
  @IsArray()
  @Validate(IsNumberOrString, { each: true })
  products: number[] | string[];
}
