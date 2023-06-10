import { FastifyRequest, FastifyReply } from "fastify";
import fs from "fs";
import path from "path";
import util from "util";
import { pipeline } from "stream";

import jwt from "jsonwebtoken";

const pump = util.promisify(pipeline);

export default async function createFileController(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const files = await request.files();
		const { authorization } = request.headers as { authorization: string };

		const token = authorization?.replace("JWT ", "");

		const uploadsDir = process.env.FILES_FOLDERS;

		const { id } = jwt.verify(token, process.env.JWT_SECRET);

		let hasFile = false;

		for await (const file of files) {
			if (file.file) {
				hasFile = true;

				const updateTime = new Date()
					.toLocaleDateString("en-US")
					.replace(/\//g, "-");

				const fileName = `${id}_${updateTime}_${file.filename}`;
				const savePath = path.join(uploadsDir, fileName);

				await pump(file.file, fs.createWriteStream(savePath));
			}
		}

		if (!hasFile) {
			response.code(400).send({
				statusCode: 400,
				error: {
					message: "No file provided",
				},
				data: null,
				success: false,
			});
			return;
		}

		response.send({
			statusCode: 200,
			error: null,
			data: {
				message: "File uploaded successfully",
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