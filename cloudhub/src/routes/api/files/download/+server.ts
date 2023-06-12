import { API_URL } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";

export async function POST({
	request,
	cookies,
}: { request: Request; cookies: Cookies }) {
	const { name } = await request.json();

	const response = await fetch(`${API_URL}/api/files/download`, {
		method: "POST",
		headers: {
			Authorization: `JWT ${cookies.get("accessToken")}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name }),
	});

	if (response.ok) {
		const data = await response.blob();
		return new Response(data, { status: response.status });
	} else {
		const errorData = await response.json();
		return new Response(JSON.stringify(errorData), { status: response.status });
	}
}
