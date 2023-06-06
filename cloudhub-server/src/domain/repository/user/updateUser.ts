import { UpdateUserRequest } from "../../../types/UserRequest";
import { User } from "../../../types/User";
import database from "../../database";

export async function updateUser(
	userId: number,
	updatedUser: UpdateUserRequest,
): Promise<User> {
	try {
		const [updatedRecord] = await database("users")
			.where({ id: userId })
			.update(updatedUser)
			.returning("*");

		return updatedRecord;
	} catch (error) {
		throw {
			detail: error.detail,
			message: error.message,
			code: error.code,
		};
	}
}
