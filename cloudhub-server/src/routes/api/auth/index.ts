import { FastifyInstance } from "fastify";
import registerControllers from "../../../controllers/auth/register";

export default function auth(fastify: FastifyInstance, options, done) {
	//TODO: fastify.post("/login", loginControllers);

	fastify.post("/register", registerControllers);
	done();
}
