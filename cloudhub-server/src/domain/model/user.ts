import * as Yup from "yup";

export const userSchema = Yup.object().shape({
	first_name: Yup.string().required("First name is required."),
	last_name: Yup.string().required("Last name is required."),
	username: Yup.string()
		.required("Username is required.")
		.matches(
			/^[a-zA-Z0-9_-]+$/,
			"Username can only contain letters, numbers, hyphens, and underscores.",
		)
		.min(3, "Username must be at least 3 characters.")
		.max(20, "Username cannot exceed 20 characters."),
	email: Yup.string()
		.required("Email is required.")
		.email("Enter a valid email address."),
	password: Yup.string()
		.required("Password is required.")
		.min(8, "Password must be at least 8 characters.")
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$/,
			"Password must contain lowercase, uppercase, number, and special character.",
		),
});
