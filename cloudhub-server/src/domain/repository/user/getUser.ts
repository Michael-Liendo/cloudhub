import { User } from "../../../types/User";
import database from "../../database";

export async function getUserByUsername(username: string): Promise<User> {
	try {
		const user = await database("users")
			.select("*")
			.whereRaw("LOWER(username) = ?", username.toLowerCase())
			.orWhereRaw("LOWER(email) = ?", username.toLowerCase())
			.first();

		if (!user) {
			throw {
				detail: "User not found",
				message: "User not found",
				code: "404",
			};
		}
		return user;
	} catch (error) {
		throw {
			detail: error.detail,
			message: error.message,
			code: error.code,
		};
	}
}

export async function getUserById(id: string): Promise<User> {
	try {
		const user = await database("users").select("*").where({ id: id }).first();
		if (!user) {
			throw {
				detail: "User not found",
				message: "User not found",
				code: "404",
			};
		}
		return user;
	} catch (error) {
		throw {
			detail: error.detail,
			message: error.message,
			code: error.code,
		};
	}
}
