import { FastifyRequest, FastifyReply } from "fastify";
import { CopyConditions } from "minio";
import { minioClient } from "../../domain/minio";
import getUserID from "../../helpers/getUserID";

export default async function renameFileController(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const { newFileName, prevFileName } = request.body as {
			newFileName: string;
			prevFileName: string;
		};

		const id = getUserID(request);

		// Copiar el archivo con el nuevo nombre
		const copyConditions = new CopyConditions();

		await minioClient.copyObject(
			process.env.BUCKET_NAME,
			`${id}/${newFileName}`,
			`${process.env.BUCKET_NAME}/${id}/${prevFileName}`,
			copyConditions,
		);

		// Eliminar el archivo anterior
		await minioClient.removeObject(
			process.env.BUCKET_NAME,
			`${id}/${prevFileName}`,
		);

		response.send({
			statusCode: 200,
			error: null,
			data: {
				message: "File renamed successfully",
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
