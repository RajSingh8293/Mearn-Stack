import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		avtar: {
			type: String, // cloudery url
			required: true
		},
		coverImage: {
			type: String, // cloudery url
		},

		watchHistory:
			[
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Video"
				}

			],
		password: {
			type: String,
			required: [true, "Password is required"]
		},
		token: {
			type: String,
		},
		role: {
			type: String,
			default: 0
		},

	}, { timestamps: true }

)

// hash password 
userSchema.pre('save', async function (next) {
	// const user = this
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8)
	}
	next()
})

// compare passwrod
userSchema.methods.isPaaswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password)
}

// jwt token 
userSchema.methods.generateAuthToken = () => {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username
		},
		process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
	)
}

// refresh token 
userSchema.methods.generateRefreshToken = async () => {
	jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_SECRET }
	)

}


export const User = mongoose.model("User", userSchema)