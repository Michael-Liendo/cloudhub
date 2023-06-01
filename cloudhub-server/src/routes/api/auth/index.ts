import { FastifyInstance } from "fastify";
import registerControllers from "../../../controllers/auth/register";
import loginControllers from "../../../controllers/auth/login";

export default function auth(fastify: FastifyInstance, options, done) {
	fastify.post("/login", loginControllers);

	fastify.post("/register", registerControllers);
	done();
}
