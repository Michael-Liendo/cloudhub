import type { Cookies } from "@sveltejs/kit";
import { API_URL } from "$env/static/private";

export async function PUT({
	cookies,
	request,
}: { cookies: Cookies; request: Request }) {
	const body = await request.json();


	const response = await fetch(`${API_URL}/api/users/user`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
      Authorization: `JWT ${cookies.get("accessToken")}`,
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();

	
		return new Response(JSON.stringify(data), { status: data.statusCode });
	
}
