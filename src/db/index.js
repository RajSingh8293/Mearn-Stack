import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDb = async () => {
	try {
		const dbconnection = await mongoose.connect(`${process.env.MONGOBD_URL}/${DB_NAME}`)
		console.log(`\nMongoDB Connected !! DB HOST: , ${dbconnection.connection.host}`);
	} catch (error) {
		console.log("MongoDB connection error : ", error);
		process.exit()
	}
}