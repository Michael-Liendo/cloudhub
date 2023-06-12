import { API_URL } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";

export async function GET({ cookies }: { cookies: Cookies }) {
	const response = await fetch(`${API_URL}/api/files/files`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `JWT ${cookies.get("accessToken")}`,
		},
	});

	const data = await response.json();

	return new Response(JSON.stringify(data), { status: data.statusCode });
}