import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOptionalDto {
  @IsString()
  name: string;
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  additionalPrice: number;
}
