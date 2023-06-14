import { FastifyRequest, FastifyReply } from "fastify";

import { UpdateUserRequest } from "../../types/UserRequest";
import { updateUserSchema } from "../../domain/model/updateUser";
import { checkExistingUser } from "../../domain/repository/user/checkExistingUser";
import { updateUser } from "../../domain/repository/user/updateUser";
import getUserID from "../../helpers/getUserID";

export default async function updateUserController(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const userData = request.body as UpdateUserRequest;

		const id = getUserID(request);

		if (Object.keys(userData).length < 1) {
			throw {
				statusCode: 400,
				message: "You need send fields to change",
				error: "Bad Request",
			};
		}

		let errorFields = [];

		await updateUserSchema
			.validate(userData, { abortEarly: false })
			.catch((err) => {
				errorFields = err.inner.map((fieldError) => ({
					field: fieldError.path,
					message: fieldError.errors[0],
				}));
			});

		if (userData.username) {
			const existingUser = await checkExistingUser(userData.username);

			if (existingUser.username) {
				errorFields.push({
					field: "username",
					message: "Username already exists.",
				});
			}
		}

		if (errorFields.length > 0) {
			throw {
				statusCode: 400,
				message: "Existing user error",
				error: "Bad Request",
				errorFields,
			};
		}

		const user = await updateUser(id, userData);

		response.status(200).send({
			statusCode: 200,
			error: null,
			data: user,
			success: true,
		});
	} catch (error) {
		response.code(error.statusCode || 500).send({
			statusCode: error.statusCode || 500,
			error: {
				message: error.message || "Internal Server Error",
				error: error.error || "Internal Server Error",
				...error,
			},
			data: null,
			success: false,
		});
		if (!error.statusCode || error.statusCode === 500) {
			console.error(error);
		}
	}
}
