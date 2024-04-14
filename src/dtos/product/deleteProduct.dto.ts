import { IsString, IsNotEmpty,IsOptional } from "class-validator";

export class deleteProductDto {
  @IsNotEmpty()
  @IsString()
  public id : string;

  @IsString()
  @IsOptional()
  public productName : string;
}