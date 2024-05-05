import {
  addProductDto,
  deleteProductDto,
  editProductDto,
  searchProductByContentDTO,
} from "../dtos/product";
import { IDetail, IImage, ProductModel, UserModel } from "../models";
import createId from "../utils/generater";
import { Types } from "mongoose";

export async function addProductService(dto: addProductDto) {
  try {
    let userCheck = await UserModel.findOne({
      id: dto.userId,
    });
    console.log(dto.userId);
    if (!userCheck) {
      return { data: { error: "User is not exist!" }, status: 401 };
    }

    if (
      !(
        userCheck.role.includes("ADMIN") ||
        userCheck.role.includes("WEREHOUSEMANGER")
      )
    ) {
      return { data: { error: "The user is not permission" }, status: 401 };
    }

    const product = new ProducModel();
    product.id = await createId(dto.productName, ProducModel);
    product.productName = dto.productName;
    product.description = dto.description ? dto.description : "";
    product.cost = dto.cost;
    product.price = dto.price;
    product.productType = dto.productType;
    if (dto.color.length > 0) {
      product.color = new Types.Array<string>();
      product.color.push(...dto.color);
    }
    if (dto.size.length > 0) {
      product.size = new Types.Array<string>();
      product.size.push(...dto.size);
    }
    if (dto.detail) {
      product.detail = dto.detail;
    }
    if (dto.imgDisplay) {
      product.imgDisplay = new Types.DocumentArray<IImage>(dto.imgDisplay);
    }
    product.isDisplay = true;
    product.stockQuantity = dto.stockQuantity ? dto.stockQuantity : 0;

    await product.save();
    return { data: { ...product.toJSON() }, status: 200 };
  } catch (error) {
    console.error(error);
    return { data: { error: "Add product failed" }, status: 500 };
  }
}
export async function deleteProductService(dto: deleteProductDto) {
  try {
    let userCheck = await UserModel.findOne({
      id: dto.userId,
    });
    if (!userCheck) {
      return { data: { error: "User is exist!" }, status: 401 };
    }
    if (
      !(
        userCheck.role.includes("ADMIN") ||
        userCheck.role.includes("WEREHOUSEMANGER")
      )
    ) {
      return { data: { error: "The user is not permission" }, status: 401 };
    }

    const product = await ProducModel.findOne({ id: dto.productId });
    product.isDisplay = false;
    await product.save();
    return { data: { isRequest: true }, status: 200 };
  } catch (error) {
    console.error(error);
    return { data: { error: "delete product failed" }, status: 500 };
  }
}

export async function editProductService(dto: editProductDto) {
  try {
    let userCheck = await UserModel.findOne({
      id: dto.userId,
    });
    if (!userCheck) {
      return { data: { error: "User is not exist!" }, status: 401 };
    }
    if (
      !(
        userCheck.role.includes("ADMIN") ||
        userCheck.role.includes("WEREHOUSEMANGER")
      )
    ) {
      return { data: { error: "The user is not permission" }, status: 401 };
    }

    const product = await ProducModel.findOne({ id: dto.productId });
    product.isDisplay = dto.isDisplay ? dto.isDisplay : product.isDisplay;
    product.productName = dto.productName
      ? dto.productName
      : product.productName;
    product.description = dto.description
      ? dto.description
      : product.description;
    product.cost = dto.cost ? dto.cost : product.cost;
    product.price = dto.price ? dto.price : product.price;
    product.stockQuantity = dto.stockQuantity
      ? dto.stockQuantity
      : product.stockQuantity;
    product.productType = dto.productType
      ? dto.productType
      : product.productType;
    product.detail = dto.detail ? dto.detail : product.detail;
    product.imgDisplay = dto.imgDisplay
      ? new Types.DocumentArray<IImage>(dto.imgDisplay)
      : product.imgDisplay;
    if (dto.color.length > 0) {
      product.color = new Types.Array<string>();
      product.color.push(...dto.color);
    }
    if (dto.size.length > 0) {
      product.size = new Types.Array<string>();
      product.size.push(...dto.size);
    }
    product.updateAt = new Date();

    await product.save();
    return { data: { ...product.toJSON() }, status: 200 };
  } catch (error) {
    console.error(error);
    return { data: { error: "edit product failed" }, status: 500 };
  }
}

export async function getProductByIdService(productId: string) {
  try {
    let productCheck = await ProducModel.findOne({
      id: productId,
      isDisplay: true
    });
    if (!productCheck) {
      return { data: { error: "This product is not exist!" }, status: 401 };
    }
    return { data: productCheck.toJSON(), status: 201 }
  } catch (error) {
    console.error(error);
    return { data: { error: "Get product failed" }, status: 500 };
  }
}

export async function getAllProductService() {
  try {
    let productList = await ProducModel.find({isDisplay: true});
    let dataReturn = [];
    productList.map((value, index) => {
      dataReturn.push(value.toJSON())
    })
    return { data: dataReturn, status: 201 }
  } catch (error) {
    console.error(error);
    return { data: { error: "Get product failed" }, status: 500 };
  }
}
export async function searchProductByContentService(dto: searchProductByContentDTO) {
  try {
    const regex = new RegExp(dto.productName, "i");
    let products = await ProducModel.find({ productName: regex }).select(
      "productName description price stockQuantity productType pattern imgDisplay buyCount rating detail"
    );

    return { data: products, status: 200 };
  } catch (error) {
    console.error(error);
    return { data: { error: "search product failed" }, status: 500 };
  }
}