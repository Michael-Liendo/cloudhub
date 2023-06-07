import * as Yup from "yup";

export const updateUserSchema = Yup.object().shape({
	avatar: Yup.string().url(),
	first_name: Yup.string().min(1, "First name must be at least 3 characters."),
	last_name: Yup.string().min(1, "Last name must be at least 3 characters."),
	username: Yup.string()
		.matches(
			/^[a-zA-Z0-9_-]+$/,
			"Username can only contain letters, numbers, hyphens, and underscores.",
		)
		.min(3, "Username must be at least 3 characters.")
		.max(20, "Username cannot exceed 20 characters."),
});
