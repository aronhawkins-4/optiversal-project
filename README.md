## Project Description

This project is for the Optiversal test project.

### Project Overview:

Create a NextJS web application that displays a search box and button.
Entering a search query should execute a search on Target.com to retrieve products. Choose whichever technique you prefer for this, but you should not use 3rd party services (like RapidAPI).
Display the first 9 results in a 3 x 3 grid below the search box. For each product, display the image and product name and link both to the product's detail page on target.com.

## Getting Started

To run locally:

First, download the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Important API Note

Typically, the .env file would not be included in the GitHub repo. For the purpose of this project, however, I have included this file so that those reviewing the project do not have to manually input a RedCircle API key.
If the RedCircle API key provided no longer works, you will need to obtain your own api key by going to [https://www.redcircleapi.com/](https://www.redcircleapi.com/) and signing up for a free trial. You can then insert the new key in the .env file as the value of the RED_CIRCLE_API_KEY.
