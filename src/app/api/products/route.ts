import axios from 'axios';
import { NextResponse, NextRequest } from 'next/server';
import { JSDOM } from 'jsdom';
import { Product } from '@/app/types/types';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import { API_KEY, API_URL } from '@/app/constants/constants';

export async function GET(request: NextRequest) {
	try {
		const query = request.nextUrl.searchParams;
		const search_term = query.get('search_term');
		if (!search_term ?? typeof search_term !== 'string') {
			return NextResponse.json([]);
		}

		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto(`https://www.target.com/s?searchTerm=${search_term}`);
		await page.waitForSelector('.styles__StyledCol-sc-fw90uk-0 img', { timeout: 5_000 });
		const html = await page.evaluate(() => {
			return {
				html: document.documentElement.innerHTML,
			};
		});
		// console.log(html.html);
		const $ = cheerio.load(html.html);
		const productCards = $('body').find('.styles__StyledCol-sc-fw90uk-0').first();
		console.log(productCards.html());
		let productArray: Product[] = [];
		productCards.map((i, el) => {
			let newProduct: Product = {};
			// console.log($(el).contents());
			// console.log($(el).find('img').length);
			newProduct.imageSrc = $(el).find('img').first().attr('src') || '';
			newProduct.imageAlt = $(el).find('img').first().attr('alt');
			newProduct.title = $(el).find('a.h-text-bold').first().text() || '';
			newProduct.link = $(el).find('a').first().attr('href') || '';
			productArray.push(newProduct);
		});
		// console.log(productArray);

		// await browser.close();

		// const apiUrl = 'https://api.redcircleapi.com/request';
		// const siteUrl = `https://target.com/s?searchTerm=${search_term}`;
		// const browser = await puppeteer.launch({ headless: 'new' });
		// const page = await browser.newPage();
		// await page.goto(siteUrl, { waitUntil: 'networkidle2' });
		// const html = await page.evaluate(() => {
		// 	return {
		// 		html: document.documentElement.innerHTML,
		// 	};
		// });
		// // console.log(html.html);
		// const $ = cheerio.load(html.html);
		// console.log();
		// const images = $('.styles__StyledCardWrapper-sc-z8946b-0');
		// // images[0].children.map((child) => {
		// // 	console.log(child);
		// // });
		// console.log(images[0]);
		// const response = await fetch(siteUrl);
		// const htmlString = await response.text();
		// const dom = new JSDOM(htmlString);
		// const document = dom.window.document;
		// const productImages = document.querySelectorAll('.styles__StyledCardWrapper-sc-z8946b-0 img');

		// const apiKey = process.env.RED_CIRCLE_API_KEY;
		// const params = {
		// 	api_key: apiKey,
		// 	type: 'search',
		// 	search_term: search_term,
		// 	sort_by: 'best_seller',
		// };
		// const products = await axios.get(siteUrl, { params }).then((response) => {
		// 	return response.data.search_results;
		// });
		// const products = await axios.get(siteUrl).then((response) => {
		// const html = response.data;
		// const productImages = await page.waitForSelector('.styles__StyledCardWrapper-sc-z8946b-0 img');
		// const productTitles = document.querySelectorAll('.styles__StyledCardWrapper-sc-z8946b-0 img');
		// const productLinks = document.querySelectorAll('.styles__StyledTitleLink-sc-14ktig2-1');
		// let newProduct: Product = {};

		// productImages.forEach((image, index) => {
		// 	newProduct.imageSrc = image?.getAttribute('src');
		// 	newProduct.imageAlt = image?.getAttribute('alt');
		// 	productArray.push(newProduct);
		// });
		// productTitles.forEach((title, index) => {
		// 	productArray[index].title = title.textContent;
		// });
		// productLinks.forEach((link, index) => {
		// 	productArray[index].link = link.getAttribute('href');
		// });

		// const dom = new JSDOM(html);
		// console.log(dom.window.document.childNodes.length);
		// const document = dom.window.document;
		// console.log(document.children.length);
		// const productImages = document.querySelectorAll('.styles__StyledCardWrapper-sc-z8946b-0 img');
		// console.log(productImages.length);
		// const productTitles = document.querySelectorAll('.styles__StyledCardWrapper-sc-z8946b-0 img');
		// const productLinks = document.querySelectorAll('.styles__StyledTitleLink-sc-14ktig2-1');
		// let productArray: Product[] = [];
		// productImages.forEach((image, index) => {
		// 	let newProduct: Product = {};
		// 	newProduct.imageSrc = image?.getAttribute('src');
		// 	newProduct.imageAlt = image?.getAttribute('alt');
		// 	productArray.push(newProduct);
		// });
		// productTitles.forEach((title, index) => {
		// 	productArray[index].title = title.textContent;
		// });
		// productLinks.forEach((link, index) => {
		// 	productArray[index].link = link.getAttribute('href');
		// });
		// return productCards;
		// });
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
