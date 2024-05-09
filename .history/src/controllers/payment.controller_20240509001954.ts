import { RequestHandler, Request, Response } from "express";
import { validationResult } from "express-validator";
import { generateVnpayService, validateOrderService } from "../services/payment.service";

const createVnpayController: RequestHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const ipAddr = req.headers['x-forwarded-for'];
    const returnData = await generateVnpayService(req.user["id"], req.query.orderId ?? req.query.orderId[0] , ipAddr);
    return res.status(returnData.status).json(returnData.data);
};

const validateOrderController: RequestHandler = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const ipAddr = req.headers['x-forwarded-for'];
    const returnData = await validateOrderService(req.user["id"], req.query.orderId ?? req.query.orderId[0] , ipAddr);
    return res.status(returnData.status).json(returnData.data);
};
export {
    createVnpayController,
    validateOrderController
}
