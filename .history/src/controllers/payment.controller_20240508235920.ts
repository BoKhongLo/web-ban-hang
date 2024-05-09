import { validationResult } from "express-validator";

const createVnpayController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const ipAddr = req.headers['x-forwarded-for'];
    const returnData = await createVnpayService(req.user["id"]);
    return res.status(returnData.status).json(returnData.data);
};

export {

    createVnpayController
}