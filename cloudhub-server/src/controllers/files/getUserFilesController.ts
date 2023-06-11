import { FastifyRequest, FastifyReply } from "fastify";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export default async function getUserFilesController(
	request: FastifyRequest,
	response: FastifyReply,
) {
	try {
		const { authorization } = request.headers as { authorization: string };

		const token = authorization?.replace("JWT ", "");

		const uploadsDir = process.env.FILES_FOLDERS;
		const { id } = jwt.verify(token, process.env.JWT_SECRET);

		const userFolderPath = path.join(uploadsDir, id.toString());

		let files = [];
		if (fs.existsSync(userFolderPath)) {
			files = fs.readdirSync(userFolderPath);
		}

		const fileDetails = files.map((fileName) => {
			const filePath = path.join(userFolderPath, fileName);
			const fileStats = fs.statSync(filePath);

			return {
				name: fileName,
				size: fileStats.size,
				createdAt: fileStats.birthtime,
			};
		});

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
