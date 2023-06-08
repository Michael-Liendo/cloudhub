import { FastifyRequest, FastifyReply } from "fastify";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";

const pump = util.promisify(pipeline);
export default async function createFileController(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const { authorization } = request.headers as { authorization: string };
		const token = authorization?.replace("JWT ", "");
		// todo: files saver
		const data = request.body;

		// Handle file upload and save
		// ...

		console.log(data);
		response.send(data);
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
