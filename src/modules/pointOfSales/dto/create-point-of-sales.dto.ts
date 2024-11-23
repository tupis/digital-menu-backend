import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreatePointOfSalesDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsBoolean()
  isPub: boolean;
}
