import { API_URL } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";

export async function POST({
	request,
	cookies,
}: { request: Request; cookies: Cookies }) {
	const body = await request.formData();

	const response = await fetch(`${API_URL}/api/files/upload`, {
		method: "POST",
		headers: {
			Authorization: `JWT ${cookies.get("accessToken")}`,
		},
		body: body,
	});

	const data = await response.json();

	return new Response(JSON.stringify(data), { status: data.statusCode });
}