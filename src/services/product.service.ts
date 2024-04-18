import { addProductDto, deleteProductDto, editProductDto } from "../dtos/product";
import { ProducModel } from "../models";
import { v5 as uuidv5 } from "uuid";
import * as OTPAuth from "otpauth";
import * as otpGenerator from "otp-generator";

export async function addProductService(dto: addProductDto) {
  try {
    const product = new ProducModel();
    let generatedOTP: string = otpGenerator.generate(6, {
      digits: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    let idProduct: string = uuidv5(dto.productName + generatedOTP, uuidv5.URL);
    while (true) {
      const dataPreOtp = await ProducModel.findOne({
        id: idProduct,
      });
      if (dataPreOtp) {
        generatedOTP = otpGenerator.generate(6, {
          digits: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        idProduct = uuidv5(dto.productName + generatedOTP, uuidv5.URL);
      } else {
        break;
      }
    }
    product.id = idProduct;
    product.productName = dto.productName;
    product.description = dto.description;
    product.cost = dto.cost;
    product.price = dto.price;
    product.productType = dto.productType;
    product.pattern = dto.pattern;
    product.detail = dto.detail ? dto.detail : "NULL";
    product.isDisplay = true;
    product.stockQuantity = "1000";

    await product.save();
    return { data: { ...product.toJSON() }, status: 200 };
  } catch (error) {
    console.error(error);
    return { data: { error: "Add product failed" }, status: 500 };
  }
}
export async function deleteProductService(dto: deleteProductDto) {
  try{
    const product = await ProducModel.findOne({id : dto.id});
    product.isDisplay = false;
    await product.save();
    return { data: { ...product.toJSON() }, status: 200 };
  }catch (error) {
    console.error(error);
    return { data: { error: "delete product failed" }, status: 500 };
  }
}


export async function editProductService(dto: editProductDto) {
  try{
    const product = await ProducModel.findOne({id : dto.id});
    product.isDisplay = dto.isDisplay;
    product.productName = dto.productName ;
    product.description = dto.description;
    product.cost = dto.cost;
    product.price = dto.price;
    product.stockQuantity = dto.stockQuantity; 
    product.productType = dto.productType;
    product.detail = dto.detail;
    await product.save();
    return { data: { ...product.toJSON() }, status: 200 };
  }catch(error) {
    console.error(error);
    return { data: { error: "edit product failed" }, status: 500 };
  }
};