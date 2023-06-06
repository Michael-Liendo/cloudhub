export type CreateUserRequest = {
	avatar?: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
};

export type UpdateUserRequest = {
	avatar?: string;
	first_name?: string;
	last_name?: string;
	username?: string;
};
