import { UserModel } from "../models";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { validate } from 'class-validator';
import {getUserByIdService, editProfileService} from "../services/user.service";
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
  const dto = new EditProfileDto();
  dto.phoneNumber = req.body.phoneNumber;
  dto.firstName = req.body.firstName;
  dto.lastName = req.body.lastName;
  dto.username = req.body.username;
  dto.address = req.body.address;
  dto.gender = req.body.gender;
  dto.birthday = req.body.birthday;
  dto.imgDisplay = req.body.imgDisplay;
  dto.userId = req.user["id"];
  validate(dto).then((errors) => {
    if (errors.length > 0) {
      res.status(500).json({ errors: errors });
    }
  });
  const returnData = await editProfileService(dto);
  return res.status(returnData.status).json(returnData.data);

};

const addHeartProductController = async (req : Request, res : Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};
const removeHeartProductController = async (req : Request, res : Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};
export {
    getUserByIdController,
    editUserByIdController,
    addHeartProductController,
    removeHeartProductController
};