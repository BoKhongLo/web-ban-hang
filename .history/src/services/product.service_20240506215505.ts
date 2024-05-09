import {
  addProductDto,
  deleteProductDto,
  editProductDto,
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

    const product = new ProductModel();
    product.id = await createId(dto.productName, ProductModel);
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

    const product = await ProductModel.findOne({ id: dto.productId });
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

    const product = await ProductModel.findOne({ id: dto.productId });
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
    let productCheck = await ProductModel.findOne({
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
    let productList = await ProductModel.find({isDisplay: true});
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
export async function searchProductService(params: any) {
  try {
    const filter = {};

    if (params.tags.length > 0) filter['detail.tags'] = { $in: params.tags };
    if (params.brand.length > 0) {
      const brandRegex = params.brand.map(cat => new RegExp(cat, 'i')); 
      filter['detail.company'] = { $in: brandRegex };
    }
    if (params.color.length > 0) filter['color'] = { $in: params.color };
    if (params.size.length > 0) filter['size'] = { $in: params.size };
    if (params.category.length > 0) {
      const categoryRegex = params.category.map(cat => new RegExp(cat, 'i')); 
      filter['productType'] = { $in: categoryRegex }; 
    }
    if (params.title.length > 0) {
      const titleRegex = params.title.map(cat => new RegExp(cat, 'i')); 
      filter['productName'] = { $in: titleRegex }; 
    }
    let productList = await ProductModel.find(filter);
    let dataReturn = [];
    productList.map((value, index) => {
      dataReturn.push(value.toJSON())
    })

    return { data: dataReturn, status: 200 };
  } catch (error) {
    console.error(error);
    return { data: { error: "search product failed" }, status: 500 };
  }
}
export async function topProductService(top: string, quantity: number = 6) {
  try {
    let productList = []
    if (top === "hot-sales") { 
      productList = await ProductModel.find().sort({ buyCount: -1 }).limit(quantity); 
    }
    else if (top === "new-arrivals") {
      productList = await ProductModel.find().sort({ createdAt: -1 }).limit(quantity); 
    }
     
    let dataReturn = productList.map(product => product.toJSON()); 
    return { data: dataReturn, status: 200 };
  } catch (error) {
    console.error(error);
    return { data: { error: "Top product failed" }, status: 500 };
  }
}
