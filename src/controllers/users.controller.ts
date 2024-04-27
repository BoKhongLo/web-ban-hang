import { UserModel } from "../models";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { validate } from 'class-validator';
import getUserByIdService from "../services/user.service";

const getUserByIdController = async (req : Request, res : Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const returnData = await getUserByIdService(req.params.slug);
    return res.status(returnData.status).json(returnData.data);
};

const updateUserDetails = async (req : Request, res : Response) => {

};

const getOrderHistory = async (req : Request, res : Response) => {

};

export {
    getUserByIdController,
    updateUserDetails,
    getOrderHistory,
};
