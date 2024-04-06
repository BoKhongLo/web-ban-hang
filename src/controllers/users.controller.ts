import { UserModel } from "../models";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { validate } from 'class-validator';

const getUserDetails = async (req : Request, res : Response) => {
    return res.json({auth: "ok"})
};

const updateUserDetails = async (req : Request, res : Response) => {

};

const getOrderHistory = async (req : Request, res : Response) => {

};

export {
    getUserDetails,
    updateUserDetails,
    getOrderHistory,
};
