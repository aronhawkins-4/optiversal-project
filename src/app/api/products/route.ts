import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';

interface IParams {
	query?: string;
}

export async function GET(request: NextRequest) {
	try {
		const query = request.nextUrl.searchParams;
		const search_term = query.get('search_term');
		if (!search_term ?? typeof search_term !== 'string') {
			return NextResponse.json([]);
		}

		const apiUrl = 'https://api.redcircleapi.com/request';
		const apiKey = process.env.RED_CIRCLE_API_KEY;
		const params = {
			api_key: apiKey,
			type: 'search',
			search_term: search_term,
			sort_by: 'best_seller',
		};
		const products = await axios.get(apiUrl, { params }).then((response) => {
			return response.data.search_results;
		});
		if (products) {
			return NextResponse.json(products);
		} else {
			return NextResponse.json([]);
		}
	} catch (error: any) {
		console.log('ERROR_GET_PRODUCTS', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
