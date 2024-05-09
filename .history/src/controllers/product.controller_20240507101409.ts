import {
  addProductDto,
  deleteProductDto,
  editProductDto,
} from "../dtos/product";
import { validate } from "class-validator";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import {
  addProductService,
  deleteProductService,
  editProductService,
  getAllProductService,
  getProductByIdService,
  searchProductService,
  topProductService
} from "../services/product.service";

const addProductController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new addProductDto();
  dto.productName = req.body.productName;
  dto.cost = req.body.cost;
  dto.price = req.body.price;
  dto.description = req.body.description;
  dto.productType = req.body.productType;
  dto.detail = req.body.detail;
  dto.color = req.body.color;
  dto.size = req.body.size;
  dto.userId = req.user['id'];
  dto.stockQuantity = req.body.stockQuantity;
  dto.imgDisplay = req.body.imgDisplay;
  try {
    validate(dto).then((errors) => {
      if (errors.length > 0) {
        res.status(500).json({ errors: errors });
      }
    });
  } catch (err) {
    console.error(err);
  }
  const returnData = await addProductService(dto);

  return res.status(returnData.status).json(returnData.data);
};

const deleteProductController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new deleteProductDto();
  dto.productId = req.body.productId;
  dto.userId = req.user['id'];
  try {
    validate(dto).then((errors) => {
      if (errors.length > 0) {
        res.status(500).json({ errors: errors });
      }
    });
  } catch (err) {
    console.error(err);
  }
  const returnData = await deleteProductService(dto);
  return res.status(returnData.status).json(returnData.data);
};

const editProductController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new editProductDto();
  dto.userId = req.user['id'];
  dto.productId = req.body.productId;
  dto.productName = req.body.productName;
  dto.cost = req.body.cost;
  dto.isDisplay = req.body.isDisplay;
  dto.description = req.body.description;
  dto.detail = req.body.detail;
  dto.price = req.body.price;
  dto.color = req.body.color;
  dto.size = req.body.size;
  dto.stockQuantity = req.body.stockQuantity;
  dto.productType = req.body.productType;
  dto.imgDisplay = req.body.imgDisplay;
  const returnData = await editProductService(dto);
  return res.status(returnData.status).json(returnData.data);
};

const searchProductController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { tags, brand, color, size, category, title } = req.query;
  const searchParams = { tags, brand, color, size, category, title };
  for (let it in searchParams) {
    if (typeof searchParams[it] === 'undefined') {
      searchParams[it] = [];
    }
    else if (typeof searchParams[it] === 'string') {
      searchParams[it] = [searchParams[it]]
    }
  }
  const returnData = await searchProductService(searchParams);
  return res.status(returnData.status).json(returnData.data);
}

const getProductByIdController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const returnData = await getProductByIdService(req.params.slug);

  return res.status(returnData.status).json(returnData.data);
};

const getAllProductController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const returnData = await getAllProductService();
  return res.status(returnData.status).json(returnData.data);
};

const topProductController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { top, quantity } = req.query;
  const searchParams = {};

  if (typeof top === 'string') {
    searchParams['top'] = [top];
  }
  if (typeof quantity === 'string') {
    searchParams['quantity'] = [parseInt(quantity as string, 10)]; 
  }
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    searchParams['quantity'] = [6];
  }
  const returnData = await topProductService(searchParams['top'][0], searchParams['quantity'][0]);
  return res.status(returnData.status).json(returnData.data);
}

export { 
  addProductController, 
  deleteProductController, 
  editProductController, 
  searchProductController,
  getAllProductController,
  getProductByIdController,
  topProductController 
};