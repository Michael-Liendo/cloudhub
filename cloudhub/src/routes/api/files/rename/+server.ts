import { API_URL } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";

export async function PUT({
	request,
	cookies,
}: { request: Request; cookies: Cookies }) {
	const {prevFileName, newFileName} = await request.json();

	const response = await fetch(`${API_URL}/api/files/rename`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `JWT ${cookies.get("accessToken")}`,
		},
		body: JSON.stringify({prevFileName, newFileName}),
	});

	const data = await response.json();
	return new Response(JSON.stringify(data), { status: data.statusCode });
}