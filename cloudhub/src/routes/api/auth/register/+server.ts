import type { Cookies } from "@sveltejs/kit";
import { API_URL } from "$env/static/private";

export async function POST({
	cookies,
	request,
}: { cookies: Cookies; request: Request }) {
	const requestBody = await request.json();

	const { first_name, last_name, username, email, password } = requestBody;

	const response = await fetch(`${API_URL}/api/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ first_name, last_name, username, email, password }),
	});

	const data = await response.json();

	if (response.ok && data.data?.accessToken) {
		cookies.set("accessToken", data.data.accessToken, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			// Expires in a month
			maxAge: 60 * 60 * 24 * 30,
		});
		return new Response(JSON.stringify(data), { status: data.statusCode });
	}
	return new Response(JSON.stringify(data), { status: data.statusCode });
}
