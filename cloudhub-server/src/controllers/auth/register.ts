import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserRequest } from "../../types/AuthRequest";
import { hashPassword } from "../../helpers/hashPassword";
import { createUser } from "../../domain/repository/user/createUser";
import generateToken from "../../helpers/generateToken";
import { userSchema } from "../../domain/model/user";
import { checkExistingUser } from "../../domain/repository/user/checkExistingUser";

export default async function registerControllers(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const { first_name, last_name, username, email, password } =
			request.body as CreateUserRequest;

		let errorFields = [];

		await userSchema
			.validate(request.body, { abortEarly: false })
			.catch((err) => {
				errorFields = err.inner.map((fieldError) => ({
					field: fieldError.path,
					message: fieldError.errors[0],
				}));
			});
		const existingUser = await checkExistingUser(username, email);

		if (existingUser.username) {
			errorFields.push({
				field: "username",
				message: "Username already exists.",
			});
		}

		if (existingUser.email) {
			errorFields.push({
				field: "email",
				message: "Email already exists.",
			});
		}

		if (errorFields.length > 0) {
			throw {
				statusCode: 400,
				message: "Existing user error",
				error: "Bad Request",
				errorFields,
			};
		}

		const hashedPassword = await hashPassword(password);

		const user: CreateUserRequest = {
			first_name,
			last_name,
			username,
			email: email.toLocaleLowerCase(),
			password: hashedPassword,
		};

		const accessToken = await generateToken(await createUser(user));

		response.setCookie("accessToken", accessToken).status(200).send({
			statusCode: 200,
			error: null,
			data: {
				accessToken,
			},
			success: true,
		});
	} catch (error) {
		if (!error.statusCode) console.error(error);
		response.code(error.statusCode || 500).send({
			statusCode: error.statusCode || 500,
			error: {
				...error,
				message: error.message || "Internal Server Error",
				error: error.error || "Internal Server Error",
			},
			data: null,
			success: false,
		});
	}
}
