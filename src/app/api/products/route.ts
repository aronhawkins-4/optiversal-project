import { NextResponse, NextRequest } from 'next/server';
import { Product } from '@/app/types/types';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
	try {
		// Get URL Params and parse search term
		const query = request.nextUrl.searchParams;
		const search_term = query.get('search_term');
		if (!search_term ?? typeof search_term !== 'string') {
			return NextResponse.json([]);
		}

		// Open Puppeteer Browser
		const browser = await puppeteer.launch({ headless: 'new' });
		const page = await browser.newPage();
		await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
		await page.goto(`https://www.target.com/s?searchTerm=${search_term}`);
		await page.waitForSelector('.styles__StyledCardWrapper-sc-z8946b-0 img');
		await delay(1000);
		await page.evaluate(() => {
			window.scrollBy(0, 3000);
		});
		await delay(1000);
		await page.evaluate(() => {
			window.scrollBy(0, 3000);
		});
		await page.waitForSelector('.ProductRecsWrapper-sc-b7g1ua-0 img', { timeout: 60_000 });
		const html = await page.evaluate(() => {
			return {
				html: document.documentElement.innerHTML,
			};
		});

		// Initialize Cheerio to parse html elements
		const $ = cheerio.load(html.html);

		// Get Product Cards
		const productCards = $('body').find('.styles__StyledCardWrapper-sc-z8946b-0');
		let productArray: Product[] = [];

		// Map over product cards and put information into Product objects which are pushed into productArray
		productCards.map((i, el) => {
			let newProduct: Product = {};
			newProduct.imageSrc = $(el).find('source').attr('srcset');
			newProduct.imageAlt = $(el).find('img').first().attr('alt');
			newProduct.title = $(el).find('img').first().attr('alt');
			newProduct.link = $(el).find('a').first().attr('href');
			productArray.push(newProduct);
		});
		await browser.close();
		if (productArray) {
			return NextResponse.json(productArray);
		} else {
			return NextResponse.json([]);
		}
	} catch (error: any) {
		console.log('ERROR_GET_PRODUCTS', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

function delay(time: number) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}
