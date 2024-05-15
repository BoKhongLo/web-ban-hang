import { body, validationResult } from "express-validator";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { createOderDto, updateOrderDto } from "../dtos/order";
import { cancelOrderService, createOderService, getAllOrderService, getOrderByIdService, getOrderUserService, updateOrderService } from "../services/order.service";


const createOrderController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new createOderDto;
  dto.userId = req.user["id"];
  dto.paymentMethods = req.body.paymentMethods;
  dto.deliveryInfo = req.body.deliveryInfo;
  dto.personalDetails = req.body.personalDetails;
  dto.note = dto.note;
  dto.deliveryType = req.body.deliveryType;
  try {
    validate(dto).then((errors) => {
      if (errors.length > 0) {
        res.status(500).json({ errors: errors });
      }
    });
  } catch (err) {
    console.error(err);
  }
  const returnData = await createOderService(dto);
  return res.status(returnData.status).json(returnData.data);
}
const getOrderByIdController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const returnData = await getOrderByIdService(req.user["id"], req.params.slug);
  return res.status(returnData.status).json(returnData.data);
};

const getOrderUserController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const returnData = await getOrderUserService(req.user["id"]);
  return res.status(returnData.status).json(returnData.data);
};

const cancelOrderController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const returnData = await cancelOrderService(req.user["id"], req.body.orderId);
  return res.status(returnData.status).json(returnData.data);
};

const getAllOrderController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const returnData = await getAllOrderService(req.user["id"]);
  return res.status(returnData.status).json(returnData.data);
};

const updateOrderController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dto = new updateOrderDto;
  dto.adminId = req.user["id"];
  dto.status = req.body.status;
  dto.isPaid = req.body.isPaid
  dto.orderId = req.body.orderId
  try {
    validate(dto).then((errors) => {
      if (errors.length > 0) {
        res.status(500).json({ errors: errors });
      }
    });
  } catch (err) {
    console.error(err);
  }
  const returnData = await updateOrderService(dto);
  return res.status(returnData.status).json(returnData.data);
};

export { 
  createOrderController,
  getOrderByIdController,
  getOrderUserController,
  cancelOrderController,
  getAllOrderController,
  updateOrderController,
}