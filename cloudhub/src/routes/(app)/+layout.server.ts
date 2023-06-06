import { redirect } from '@sveltejs/kit';

import type { User } from '../../app';

export const load = ({
	locals
}: {
	locals: {
		accessToken?: string | null;
		user?: User | null;
	};
}) => {
	if (!locals.user || !locals.accessToken) {
		throw redirect(302, '/login');
	}

	return {
		accessToken: locals.accessToken,
		user: locals.user,
	};
};