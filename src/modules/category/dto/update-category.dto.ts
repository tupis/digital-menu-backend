import { IsBoolean } from "class-validator";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsBoolean()
  active: boolean;
}
