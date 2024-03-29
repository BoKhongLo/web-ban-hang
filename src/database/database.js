import mongoose from "mongoose";

async function connect() {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connect Database success");
        return connection;
    } catch (error) {
        let errorMessage = error.message;
        throw new Error(errorMessage);
    }
}

export default connect;
