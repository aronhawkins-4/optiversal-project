import axios from 'axios';
import { NextResponse } from 'next/server';

interface IParams {
	query?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
	try {
		const { query } = params;
		console.log(query);
		if (!query ?? typeof query !== 'string') {
			throw new Error('Invalid Search Request');
		}

		const apiUrl = 'https://api.redcircleapi.com/request';
		const apiKey = process.env.RED_CIRCLE_API_KEY;
		const data = {
			api_key: apiKey,
			type: 'search',
			search_term: query,
			sort_by: 'best_seller',
		};
		const products = await axios.get(apiUrl, { data }).then((response) => {
			return NextResponse.json(response.data);
		});
	} catch (error: any) {
		console.log('ERROR_GET_PRODUCTS', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
