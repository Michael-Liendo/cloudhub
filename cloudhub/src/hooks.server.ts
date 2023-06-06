import type { Handle } from '@sveltejs/kit';

async function getUserDetails(accessToken: string) {
	const request = await fetch(`${import.meta.env.VITE_API_URL}/api/users/user/`, {
		headers: {
			Authorization: `JWT ${accessToken}`
		}
	});

	const response = await request.json();

	return response;
}


export const handle: Handle = async ({ event, resolve }) => {
	try {
		const accessToken = event.cookies.get('accessToken');

		if (!accessToken) {
			return await resolve(event);
		}

		const userDetails = await getUserDetails(accessToken).catch((error) =>{
			event.cookies.set('accessToken', '', {
				maxAge: -1
			});
			console.error(error);
			
		})

		if(!userDetails?.success){
			event.cookies.set('accessToken', '', {
				maxAge: -1
			});
		}

		if (accessToken) {
			event.locals.accessToken = accessToken;
			event.locals.user = userDetails.data.user;
		}

		return await resolve(event);
	} catch (err) {
		console.log(err);
		event.locals.accessToken = null;
		event.locals.user = null;
		

		return await resolve(event);
	}
};