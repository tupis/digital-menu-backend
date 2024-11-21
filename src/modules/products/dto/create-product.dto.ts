import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CreateOptionalDto } from "./create-optional.dto";
import { Type } from "class-transformer";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionalDto)
  optional: CreateOptionalDto[];
}
