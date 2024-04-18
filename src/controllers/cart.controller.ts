import { body, validationResult } from "express-validator";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { CartDto } from "../dtos/cart";
import { createCartService } from "../services/cart.service";

