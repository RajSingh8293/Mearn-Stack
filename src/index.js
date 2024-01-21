import app from "./app.js";
import { connectDb } from "./db/index.js";
import dotenv from 'dotenv'
// import 'dotenv/config'

dotenv.config({
	path: './env'
})



connectDb().then(() => {
	app.listen(process.env.PORT || 8000, () => {
		console.log(`Server is running on : ${process.env.PORT}`);
	})
}).catch((error) => {
	console.error("MongoDb connection failed !!", error)
})





/*
import express from 'express'
const app = express()
	// using imegietly invoke function IIFE 
	; (async () => {
		try {
			const dbconnection = await mongoose.connect(`${process.env.MONGOBD_URL}/${DB_NAME}`)
			console.log("MongoDB Connected", dbconnection);
			app.on("error ", (error) => {
				console.log("ERRR: ", error);
				throw error
			})
			app.listen(process.env.PORT || 4000, () => {
				console.log(`Server is listening on port ${process.env.PORT}`);
			})
		} catch (error) {
			console.log("ERROR: ", error);
			throw error
		}

	})()
	*/