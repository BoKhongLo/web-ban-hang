import {IsString, IsNotEmpty} from "class-validator";

export class searchProductByContentDTO {
  @IsString()
  @IsNotEmpty()
  public productName: string;
}