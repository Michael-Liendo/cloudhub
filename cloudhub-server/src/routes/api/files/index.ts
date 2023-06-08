import { FastifyInstance } from "fastify";
import verifyToken from "../../../middleware/verifyToken";
import createFileController from "../../../controllers/files/createFileController";

export default function files(fastify: FastifyInstance, options, done) {
	fastify.addContentTypeParser("multipart/form-data", (req, _, done) => {
		done(null, req);
	});

	fastify.route({
		method: "POST",
		url: "/file",
		attachValidation: true,
		preHandler: verifyToken,
		handler: createFileController,
	});

	done();
}
