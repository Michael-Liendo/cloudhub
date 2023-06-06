import jwt from "jsonwebtoken";
import { User } from "../types/User";

export default function generateToken(user: User) {
	const payload = { id: user.id };
	const options = { expiresIn: "30d" };

	return jwt.sign(payload, process.env.JWT_SECRET, options);
}
