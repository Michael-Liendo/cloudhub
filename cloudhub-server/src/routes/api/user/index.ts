import { FastifyInstance } from "fastify";
import usersController from "../../../controllers/user/users";
import userController from "../../../controllers/user/user";
import verifyToken from "../../../middleware/verifyToken";
import updateUserController from "../../../controllers/user/update";

export default function users(fastify: FastifyInstance, options, done) {
	fastify.route({
		method: "GET",
		url: "/",
		handler: usersController,
	});

	fastify.route({
		method: "GET",
		url: "/user/:username",
		handler: userController,
	});

	fastify.route({
		method: "PUT",
		url: "/user",
		preHandler: verifyToken,
		handler: updateUserController,
	});

	done();
}
