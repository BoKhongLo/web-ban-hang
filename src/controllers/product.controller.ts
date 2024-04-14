import {
  addProductDto,
  deleteProductDto,
  editProductDto,
} from "../dtos/product";
import { ProducModel } from "../models";
import { validate } from "class-validator";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import {
  addProductService,
  deleteProductService,
  editProductService,
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
  dto.pattern = req.body.pattern;

  validate(dto).then((errors) => {
    if (errors.length > 0) {
      res.status(500).json({ errors: errors });
    }
  });
  const returnData = await addProductService(dto);

  return res.status(returnData.status).json(returnData.data);
};

const deleteProductController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new deleteProductDto();
  dto.id = req.body.id;
  dto.productName = req.body.productName;
  validate(dto).then((errors) => {
    if (errors.length > 0) {
      res.status(500).json({ errors: errors });
    }
  });
  const returnData = await deleteProductService(dto);
  return res.status(returnData.status).json(returnData.data);
};

const editProductController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new editProductDto();
  dto.productName = req.body.productName;
  dto.cost = req.body.cost;
  dto.isDisplay = req.body.isDisplay;
  dto.description = req.body.description;
  dto.detail = req.body.detail;
  dto.price = req.body.price;
  dto.pattern = req.body.pattern;
  dto.productType = req.body.productType;
  dto.stockQuantity = req.body.stockQuantity;
  const returnData = await editProductService(dto);
  return res.status(returnData.status).json(returnData.data);
};

export { addProductController, deleteProductController, editProductController };