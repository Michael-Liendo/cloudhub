import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { minioClient } from "../../domain/minio";

export default async function deleteFileController(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const { authorization } = request.headers as { authorization: string };
		const token = authorization?.replace("JWT ", "");
		const { id } = jwt.verify(token, process.env.JWT_SECRET) as {
			id: string;
		};

		const { name } = request.body as { name: string };

		await minioClient.removeObject(process.env.BUCKET_NAME, `${id}/${name}`);

		response.send({
			statusCode: 200,
			error: null,
			data: {
				message: `File '${name}' deleted successfully`,
			},
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
