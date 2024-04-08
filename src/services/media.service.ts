import multer, { Multer } from 'multer';
import { v5 as uuidv5 } from 'uuid';
import * as OTPAuth from "otpauth";
import * as otpGenerator from 'otp-generator';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
export const uploadFile = multer({ storage: storage });


