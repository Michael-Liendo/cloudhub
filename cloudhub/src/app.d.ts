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

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			accessToken?: string | null;
			user?: User | null
		
		}

		interface Locals {
			accessToken?: string | null;
			user?: User | null
		}

	}
}

export {};
