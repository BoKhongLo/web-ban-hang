import { UserModel } from "../models";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { validate } from 'class-validator';
import {getUserByIdService, editProfileService, addHeartProductService, removeHeartProductService} from "../services/user.service";
import { EditProfileDto } from "../dtos/user";

const getUserByIdController = async (req : Request, res : Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const returnData = await getUserByIdService(req.user["id"]);
    return res.status(returnData.status).json(returnData.data);
};

const editUserByIdController = async (req : Request, res : Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const removeHeartProductController = async (req : Request, res : Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const returnData = await removeHeartProductService(req.body.productId, req.user['id']);
    return res.status(returnData.status).json(returnData.data);
  };
  const returnData = await editProfileService(dto);
  return res.status(returnData.status).json(returnData.data);

};

const addHeartProductController = async (req : Request, res : Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const returnData = await addHeartProductService(req.body.productId, req.user['id']);
  return res.status(returnData.status).json(returnData.data);
};

const removeHeartProductController = async (req : Request, res : Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const returnData = await removeHeartProductService(req.body.productId, req.user['id']);
  return res.status(returnData.status).json(returnData.data);
};

const editRoleController = async (req : Request, res : Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const removeHeartProductController = async (req : Request, res : Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const returnData = await removeHeartProductService(req.body.productId, req.user['id']);
    return res.status(returnData.status).json(returnData.data);
  };
  const returnData = await removeHeartProductService(req.body.productId, req.user['id']);
  return res.status(returnData.status).json(returnData.data);
};

export {
    getUserByIdController,
    editUserByIdController,
    addHeartProductController,
    removeHeartProductController
};
