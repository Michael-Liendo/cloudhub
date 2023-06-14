import { FastifyRequest, FastifyReply } from "fastify";
import { minioClient } from "../../domain/minio";
import getUserID from "../../helpers/getUserID";

export default async function getUserFilesController(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const id = getUserID(request);

		const fileDetails = [];

		const stream = minioClient.listObjectsV2(process.env.BUCKET_NAME, id, true);

		for await (const file of stream) {
			const stat = await minioClient.statObject(
				process.env.BUCKET_NAME,
				file.name,
			);

			fileDetails.push({
				name: String(file.name).replace(/(.+)\//g, ""),
				size: stat.size,
				createdAt: stat.lastModified,
				etag: stat.etag,
			});
		}

		response.send({
			statusCode: 200,
			error: null,
			data: {
				files: fileDetails,
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
