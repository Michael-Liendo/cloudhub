import { FastifyInstance } from "fastify";
import verifyToken from "../../../middleware/verifyToken";
import createFileController from "../../../controllers/files/createFileController";
import fastifyMultipart from "@fastify/multipart";
import getUserFilesController from "../../../controllers/files/getUserFilesController";
import downloadFileController from "../../../controllers/files/downloadFileController";
import deleteFileController from "../../../controllers/files/deleteFileController";
import renameFileController from "../../../controllers/files/renameFileController";

export default function files(fastify: FastifyInstance, options, done) {
	fastify.register(fastifyMultipart);

	fastify.route({
		method: "POST",
		url: "/upload",
		preHandler: verifyToken,
		handler: createFileController,
	});

	fastify.route({
		method: "PUT",
		url: "/rename",
		preHandler: verifyToken,
		handler: renameFileController,
	});

	fastify.route({
		method: "DELETE",
		url: "/delete",
		preHandler: verifyToken,
		handler: deleteFileController,
	});

	fastify.route({
		method: "GET",
		url: "/files",
		preHandler: verifyToken,
		handler: getUserFilesController,
	});

	fastify.route({
		method: "POST",
		url: "/download",
		preHandler: verifyToken,
		handler: downloadFileController,
	});

	done();
}
