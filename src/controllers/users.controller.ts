import { UserModel } from "../models";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { validate } from 'class-validator';

const getUserByID = async (req : Request, res : Response) => {
    return res.json({auth: "ok"})
};

const editUserByID = async (req : Request, res : Response) => {

};

const getOrderHistory = async (req : Request, res : Response) => {

};

export {
    getUserByID,
    editUserByID,
    getOrderHistory,
};
