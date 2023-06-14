import { FastifyRequest, FastifyReply } from "fastify";
import { minioClient } from "../../domain/minio";
import getUserID from "../../helpers/getUserID";

export default async function Controller(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const id = getUserID(request);

		const { name } = request.body as { name: string };

		const objectStream = await minioClient.getObject(
			process.env.BUCKET_NAME,
			`${id}/${name}`,
		);

		const chunks: Buffer[] = [];

		return new Promise<void>((resolve, reject) => {
			objectStream.on("data", (chunk) => {
				chunks.push(chunk);
			});

			objectStream.on("end", () => {
				const fileData = Buffer.concat(chunks);

				response
					.code(200)
					.header("Content-Type", "application/octet-stream")
					.header("Content-Disposition", `attachment; filename="${name}"`)
					.send(fileData);

				resolve();
			});

			objectStream.on("error", (error) => {
				reject(error);
			});
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
