import { FastifyRequest, FastifyReply } from "fastify";
import {
	getUserById,
	getUserByUsername,
} from "../../domain/repository/user/getUser";
import jwt from "jsonwebtoken";

export default async function userController(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const { username } = request.params as { username: string };

		if (username) {
			const user = await getUserByUsername(username).catch((error) => {
				if (error.code === "22P02" || error.code === "404") {
					throw {
						statusCode: 404,
						message: "Not found user",
						error: "Not Found",
					};
				} else {
					throw {
						statusCode: 500,
						message: error.detail,
						error: error.message,
					};
				}
			});

			response.code(200).send({
				statusCode: 200,
				data: {
					user,
				},
				error: null,
				success: true,
			});
		}

		const { authorization } = request.headers as { authorization: string };

		if (authorization) {
			const token = authorization?.replace("JWT ", "");

			const decode = jwt.verify(
				token,
				process.env.JWT_SECRET,
				(error, decode) => {
					if (decode) return decode;
					else {
						response.code(401).send({
							statusCode: 401,
							error: {
								message: "Invalid token",
								error: "Unauthorized",
							},
							data: null,
							success: false,
						});

						response.setCookie("accessToken", "", {
							path: "/",
							secure: true,
							httpOnly: true,
							sameSite: "none",
							domain: "localhost",
							expires: new Date(),
						});
					}
				},
			);
			const user = await getUserById(decode?.id || "").catch((error) => {
				if (error.code === "22P02" || error.code === "404") {
					throw {
						statusCode: 404,
						message: "Not found user",
						error: "Not Found",
					};
				} else {
					throw {
						statusCode: 500,
						message: error.detail,
						error: error.message,
					};
				}
			});

			response.code(200).send({
				statusCode: 200,
				data: {
					user,
				},
				error: null,
				success: true,
			});
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
		if (!error.statusCode || error.statusCode === 500) {
			console.error(error);
		}
	}
}
