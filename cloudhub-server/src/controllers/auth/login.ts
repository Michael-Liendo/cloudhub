import { FastifyRequest, FastifyReply } from "fastify";

import { getUserByUsername } from "../../domain/repository/user/getUser";
import { CreateUserRequest } from "../../types/AuthRequest";
import checkPassword from "../../helpers/checkPassword";
import { User } from "../../types/User";
import generateToken from "../../helpers/generateToken";
import { loginSchema } from "../../domain/model/login";

export default async function loginControllers(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const { username, password } = request.body as CreateUserRequest;

		await loginSchema
			.validate(request.body, { abortEarly: false })
			.catch((err) => {
				const errorFields = err.inner.map((fieldError) => ({
					field: fieldError.path,
					message: fieldError.errors[0],
				}));
				throw {
					statusCode: 400,
					message: "Missing fields",
					error: "Bad Request",
					errorFields,
				};
			});

		const user = (await getUserByUsername(username).catch((error) => {
			if (error.code === "404") {
				throw {
					statusCode: 401,
					message: "Invalid username or password",
					error: "Unauthorized",
				};
			}
		})) as User;

		const isPasswordValid = await checkPassword(password, user.password);

		if (!isPasswordValid) {
			throw {
				statusCode: 401,
				message: "Invalid username or password",
				error: "Unauthorized",
			};
		}

		const accessToken = await generateToken(user);

		response
			.setCookie(
				"accessToken",
				accessToken,
				/* esta configuración es opcional */ {
					path: "/", // Especifica la ruta del servidor donde la cookie es válida
					secure: true, // Como estás en localhost, no es necesario que sea seguro (si es necesario)
					httpOnly: true, // Evita que la cookie sea accesible mediante JavaScript en el navegador ( opcional )
					sameSite: "none", // Establece la política SameSite de la cookie
					expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Establece la fecha de vencimiento en 15 días
				},
			)
			.send({
				statusCode: 200,
				data: {
					accessToken,
				},
				error: null,
				success: true,
			});

		response.send(user);
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
