import { UserModel } from "../models";

export default async function getUserByIdService(userId: string) {
    try {
        const user = await UserModel.findOne({ id: userId }).select('+hash');
        if (!user) {
            return { data : {error: "User is not exist"}, status: 401 };
        }
        if ("BANNED" in user.role) {
            return { data : {error: "the user is banned!"}, status: 401 };
        }
        let dataReturn = user.toJSON();
        delete dataReturn.refresh_token;
        delete dataReturn.hash;
        return { data : dataReturn, status: 200 };
    }
    catch (error) {
        console.error(error);
        return { data : { error: "Get data failed" }, status: 500 };
    }
}