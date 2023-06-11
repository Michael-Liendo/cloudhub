// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

export type User = {
	id: string;
	avatar: "" | string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
};

export type FileDetails = {
	name: string;
	size: number;
	createdAt: Date;
};

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			accessToken?: string | null;
			user?: User | null;
			files?: FileDetails[] | null;
		}

		interface Locals {
			accessToken?: string | null;
			user?: User | null;
			files?: FileDetails[] | null;
		}
	}
}

export {};
