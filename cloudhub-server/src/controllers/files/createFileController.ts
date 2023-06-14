import { FastifyRequest, FastifyReply } from "fastify";
import { minioClient } from "../../domain/minio";
import getUserID from "../../helpers/getUserID";

export default async function createFileController(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const files = await request.files();

		const id = getUserID(request);

		for await (const file of files) {
			if (file.file) {
				const fileName = file.filename;
				const uploadPath = `${id}/${fileName}`;

				await minioClient.putObject("userfiles", uploadPath, file.file);
			}
		}

		response.send({
			statusCode: 200,
			error: null,
			data: {
				message: "Files uploaded successfully",
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
