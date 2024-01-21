export const asyncHandler = (requestHandler) => {
	(req, res, next) => {
		Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
	}
}

// export const asyncHandler = (fn) => {
// 	async (req, res, next) => {
// 		try {
// 			await fn(req, res, next)

// 		} catch (error) {
// 			res.status(error.code || 501).json({
// 				success: false,
// 				message: error.message
// 			})
// 		}
// 	}
// }

// export const asyncHandler = () => { }
// export const asyncHandler = (fnAsArgmet) => { ()=>{} }
// export const asyncHandler = (fnAsArgmet) =>  async() => { }

// short form
// export const asyncHandler = (fnAsArgmet) => () => { } 
