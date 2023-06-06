import dotenv from "dotenv";
import { createApi } from "unsplash-js";
import type { RequestEvent } from "./$types";

dotenv.config();

export type Unsplash = {
	url: string;
	author: {
		id: string;
		username: string;
		url: string;
		avatar: string;
	};
};

export async function GET(event: RequestEvent) {
	const UNSPLASH_DAILY_BACKGROUND = event.cookies.get(
		"UNSPLASH_DAILY_BACKGROUND",
	);

	if (UNSPLASH_DAILY_BACKGROUND) {
		return new Response(
			JSON.stringify({
				statusCode: 200,
				data: JSON.parse(UNSPLASH_DAILY_BACKGROUND),
				error: null,
				success: true,
			}),
		);
	}

	const unsplash = createApi({
		accessKey: process.env.UNSPLASH_ACCESS_KEY || "",
	});

	const result = await unsplash.search.getPhotos({
		query: "night",
	});

	if (result.status === 200) {
		const image = result?.response?.results[0];
		const today = new Date();

		today.setDate(today.getDate() + 1);
    // return the name author
		const response = {
			url: image?.urls.regular,
			author: {
				id: image?.user.id,
				username: image?.user.username,
				url: image?.user.portfolio_url,
				avatar: image?.user.profile_image.medium,
			},
		};

		event.cookies.set("UNSPLASH_DAILY_BACKGROUND", JSON.stringify(response), {
			expires: today,
		});

		return new Response(
			JSON.stringify({
				statusCode: 200,
				data: response,
				success: true,
				error: null,
			}),
		);
	}

	return new Response(
		JSON.stringify({
			statusCode: result.status,
			error: {
				message: result.errors?.[0]|| "An error ocurred fetching the resource",
			},
			data: null,
			success: false,
		}),
	);
}
