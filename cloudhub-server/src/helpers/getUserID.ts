import type { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export default function getUserID(request: FastifyRequest) {
	const { authorization } = request.headers as { authorization: string };
	const token = authorization?.replace("JWT ", "");
	const { id } = jwt.verify(token, process.env.JWT_SECRET) as {
		id: string;
	};

	return id;
}
