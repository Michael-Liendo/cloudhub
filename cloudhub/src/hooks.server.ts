import type { Handle } from '@sveltejs/kit';

async function getUserDetails(accessToken: string) {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/user/`, {
		headers: {
			Authorization: `JWT ${accessToken}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch user details');
	}
	const { data } = await response.json();

	return data.user;
}


export const handle: Handle = async ({ event, resolve }) => {
	try {
		const accessToken = event.cookies.get('accessToken');

		if (!accessToken) {
			return await resolve(event);
		}

		const userDetails = await getUserDetails(accessToken).catch((error) => {
			if (error.message === 'Failed to fetch user details') {
				event.cookies.set('accessToken', '', {
					maxAge: -1
				});
			}
		});

		if (accessToken) {
			event.locals.accessToken = accessToken;
			event.locals.user = userDetails;
		}

		return await resolve(event);
	} catch (err) {
		console.log(err);
		event.locals.accessToken = null;
		event.locals.user = null;
		

		return await resolve(event);
	}
};