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
    const returnData = await validateOrderService(req.query.userId ?? req.query.userId[0], req.query.orderId ?? req.query.orderId[0]);
    if (returnData.status !== 401) {
        res.redirect(`http://localhost:3000/order/${returnData.}`)
    }
};
export {
    createVnpayController,
    validateOrderController
}
