import { FastifyRequest, FastifyReply } from "fastify";
import fs from "fs";
import path from "path";
import util from "util";
import { pipeline } from "stream";

const pump = util.promisify(pipeline);

export default async function createFileController(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const files = await request.files();

		const uploadsDir =
			"/home/michael/Documents/repos/cloudhub/cloudhub-server/"; // Ruta de la carpeta de uploads

		for await (const file of files) {
			if (file.file) {
				const fileName = file.filename;
				const savePath = path.join(uploadsDir, fileName);

				await pump(file.file, fs.createWriteStream(savePath));
			}
		}

		response.send({ message: "Files uploaded successfully" });
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
