
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { getAllRoomService, getRoomByIdService, getRoomchatUserService } from "../services/rooomchat.service";

const getAllRoomchatController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const returnData = await getAllRoomService(req.user["id"]);
    return res.status(returnData.status).json(returnData.data);
};

const getRoomchatByIdController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const returnData = await getRoomByIdService(req.user["id"], req.params.slug);
    return res.status(returnData.status).json(returnData.data);
};

const getRoomchatUserController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const returnData = await getRoomchatUserService(req.user["id"]);
  return res.status(returnData.status).json(returnData.data);
};
export {
    getAllRoomchatController,
    getRoomchatByIdController,
    getRoomchatUserController
}
