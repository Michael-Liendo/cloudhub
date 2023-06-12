import { API_URL } from "$env/static/private";
import type { Handle } from "@sveltejs/kit";

async function getUserDetails(accessToken: string) {
	const request = await fetch(`${API_URL}/api/users/user/`, {
		headers: {
			Authorization: `JWT ${accessToken}`,
		},
	});

	const response = await request.json();

	return response;
}

async function getUserFiles(accessToken: string) {
	try {
		const response = await fetch(`${API_URL}/api/files/files`, {
			headers: { Authorization: `JWT ${accessToken}` },
		});
		const data = await response.json();

		return data.data.files;
	} catch (error) {
		console.error(error);
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const accessToken = event.cookies.get("accessToken");

		if (!accessToken) {
			return await resolve(event);
		}

		const userDetails = await getUserDetails(accessToken).catch((error) => {
			event.cookies.set("accessToken", "", {
				maxAge: -1,
			});
			console.error(error);
		});

		const userFilesUploads = await getUserFiles(accessToken);

		if (!userDetails?.success) {
			event.cookies.set("accessToken", "", {
				maxAge: -1,
			});
		}

		if (accessToken) {
			event.locals.accessToken = accessToken;
			event.locals.user = userDetails.data.user;
			event.locals.files = userFilesUploads;
		}

		return await resolve(event);
	} catch (err) {
		console.log(err);
		event.locals.accessToken = null;
		event.locals.user = null;
		event.locals.files = null;

		return await resolve(event);
	}
};
