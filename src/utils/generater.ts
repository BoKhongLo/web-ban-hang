import {Model} from "mongoose";
import { v5 as uuidv5 } from 'uuid';
import * as OTPAuth from "otpauth";
import * as otpGenerator from 'otp-generator';

export default async function createId(value: string, validate: Model<any>) : Promise<string> {
    let generatedToken: string = otpGenerator.generate(6, { digits: false, upperCaseAlphabets: false, specialChars: false });

    let totp = new OTPAuth.TOTP({
        algorithm: "SHA224",
        digits: 6,
        secret: generatedToken,
    });

    let token: string = totp.generate().toString();
    let idToken: string = uuidv5(value + generatedToken + token, uuidv5.URL)
    while (true) {
        const dataPreToken = await validate.findOne({
            id: idToken,
        })
        if (dataPreToken) {
            generatedToken = otpGenerator.generate(6, { digits: false, upperCaseAlphabets: false, specialChars: false });
            totp = new OTPAuth.TOTP({
                algorithm: "SHA224",
                digits: 6,
                secret: generatedToken,
            });

            token = totp.generate().toString();
            idToken = uuidv5(value + generatedToken + token, uuidv5.URL)
        }
        else {
            break;
        }
    }
    return idToken;
}