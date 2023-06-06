import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';
import type { User } from '../../app';

export const load: LayoutServerLoad = ({
	locals
}: {
	locals: {
		accessToken?: string | null;
		user?: User | null;
	};
}) => {
	if (locals.user || locals.accessToken) {
		throw redirect(302, '/home');
	}

	return {
		accessToken: locals.accessToken,
		user: locals.user
	};
};