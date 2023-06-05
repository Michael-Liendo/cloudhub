import database from "../../database";

export async function checkExistingUser(username: string, email: string) {
	const existingUser: { username?: string; email?: string } = {};

	try {
		const userByUsername = await database("users")
			.select("*")
			.whereRaw("LOWER(username) = ?", username.toLowerCase())
			.first();

		if (userByUsername) {
			existingUser.username = "Username already exists.";
		}

		const userByEmail = await database("users")
			.select("*")
			.whereRaw("LOWER(email) = ?", email.toLowerCase())
			.first();

		if (userByEmail) {
			existingUser.email = "Email already exists.";
		}

		return existingUser;
	} catch (error) {
		throw {
			detail: error.detail,
			message: error.message,
			code: error.code,
		};
	}
}
