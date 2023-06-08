import type { FastifyInstance } from "fastify";
import auth from "./api/auth";
import users from "./api/user";
import files from "./api/files";

export default function routes(fastify: FastifyInstance, options, done) {
	fastify.get("/", async () => {
		return { hello: "world" };
	});

	fastify.register(auth, { prefix: "/auth" });
	fastify.register(users, { prefix: "/users" });
	fastify.register(files, { prefix: "/files" });

	done();
}
