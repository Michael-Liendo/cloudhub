import { FastifyInstance } from "fastify";
import usersController from "../../../controllers/user/users";
import userController from "../../../controllers/user/user";
import verifyToken from "../../../middleware/verifyToken";

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

	done();
}
