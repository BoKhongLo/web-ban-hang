
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import * as fs from 'fs';
import path from "path";

const uploadFileController = async (req: Request, res: Response) => {
    try {
        if (req.files.length == 0) {
            res.status(400).send('No file uploaded.');
            return;
        }
        let urlReturn = []
        for (let i in req.files) {
            let pathFile = req.files[i].path.toString();
            urlReturn.push(pathFile.substring(8, pathFile.length));
        }
        res.json({fileUrl: urlReturn});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getFileController = async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, `../../uploads/${req.params.slug}`))
};


export {
    uploadFileController,
    getFileController
}
