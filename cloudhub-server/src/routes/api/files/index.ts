import { FastifyInstance } from "fastify";
import verifyToken from "../../../middleware/verifyToken";
import createFileController from "../../../controllers/files/createFileController";
import fastifyMultipart from "@fastify/multipart";
import getUserFilesController from "../../../controllers/files/getUserFilesController";
import downloadFileController from "../../../controllers/files/downloadFileController";

export default function files(fastify: FastifyInstance, options, done) {
	fastify.register(fastifyMultipart);

	fastify.route({
		method: "POST",
		url: "/files",
		preHandler: verifyToken,
		handler: createFileController,
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
