import { validationResult } from "express-validator";

const createController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // const returnData = await createService(req.user["id"]);
    // return res.status(returnData.status).json(returnData.data);
};

export {

    createController
}