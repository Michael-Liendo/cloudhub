import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserRequest } from "../../types/AuthRequest";
import { hashPassword } from "../../helpers/hashPassword";
import { createUser } from "../../domain/repository/user/createUser";
import generateToken from "../../helpers/generateToken";
import { userSchema } from "../../domain/model/user";

export default async function registerControllers(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const { first_name, last_name, username, email, password } =
			request.body as CreateUserRequest;

		if (!first_name || !email || !password) {
			throw {
				statusCode: 400,
				message: "Missing fields first_name, email and password",
				error: "Bad Request",
			};
		}

		await userSchema.validate({ first_name, email, password }).catch((err) => {
			throw {
				statusCode: 400,
				message: err.message,
				error: "Bad Request",
			};
		});

		const hashedPassword = await hashPassword(password);

		const user: CreateUserRequest = {
			first_name,
			last_name,
			username,
			email: email.toLocaleLowerCase(),
			password: hashedPassword,
		};

		try {
			const userCreation = await createUser(user);

			const accessToken = await generateToken(userCreation);

			// TODO: response cookie
			/* response.setCookie("accessToken", accessToken).status(200).send({
				statusCode: 200,
				error: null,
				data: {
					accessToken,
				},
				success: true,
			}); */
		} catch (error) {
			if (error.code === "23505") {
				const regex = /\(([^)]+)\)=(.*)/g;
				const [, column] = regex.exec(error.detail);

				throw {
					statusCode: 400,
					error: "Bad Request",
					message: `${column} already exists`,
				};
			} else if (error.code === "23502") {
				throw {
					statusCode: 400,
					error: "Bad Request",
					message: "A field is missing",
				};
			} else {
				console.error(error);
				throw {
					statusCode: 500,
					error: "Internal Server Error",
					message: error.message,
				};
			}
		}
	} catch (error) {
		response.code(error.statusCode || 500).send({
			statusCode: error.statusCode || 500,
			error: {
				message: error.message || "Internal Server Error",
				error: error.error || "Internal Server Error",
			},
			data: null,
			success: false,
		});
	}
}
