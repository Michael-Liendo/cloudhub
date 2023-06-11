import * as dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import cors from "@fastify/cors";
import database from "./domain/database";
import routes from "./routes";
import fastifyCookie from "@fastify/cookie";
const fastify = Fastify({
	bodyLimit: Number(process.env.MAX_FILE_SIZE) * 1024 * 1024,
});

fastify.register(routes, { prefix: "/api" });

fastify.register(cors, {
	origin: process.env.CORS_ORIGIN,
	credentials: true,
});

fastify.register(fastifyCookie);

database
	.raw("select 1")
	.then(() =>
		console.log("Connection to database has been established successfully"),
	)
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
		process.exit(1);
	});

fastify.listen(
	{ port: Number(process.env.PORT) || 3000 },
	function (err, address) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(`Server is now listening on ${address}`);
	},
);
