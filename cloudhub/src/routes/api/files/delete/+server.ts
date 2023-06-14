import { API_URL } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";

export async function DELETE({
	request,
	cookies,
}: { request: Request; cookies: Cookies }) {
	const body = await request.json();

	const response = await fetch(`${API_URL}/api/files/delete`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `JWT ${cookies.get("accessToken")}`,
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return new Response(JSON.stringify(data), { status: data.statusCode });
}