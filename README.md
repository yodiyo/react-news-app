# Project Title
News App

## Demo link:
Access my site at [https://feature-latest-news-headlines--chipper-melba-9f5487.netlify.app/](https://feature-latest-news-headlines--chipper-melba-9f5487.netlify.app/)

## Table of Content:

- [Project Title](#project-title)
	- [Demo link:](#demo-link)
	- [Table of Content:](#table-of-content)
	- [About The App](#about-the-app)
	- [Screenshots](#screenshots)
	- [Technologies](#technologies)
	- [Setup](#setup)
	- [Approach](#approach)
	- [Status](#status)
	- [Credits](#credits)
	- [License](#license)

## About The App
The News App was built to demonstrate using React to build an application showcasing displaying content from an API based on selected options, with consideration for responsiveness and accessibility.

## Screenshots

News API source:
[GNews](https://gnews.io/)      
<img src="https://gnews.io/assets/images/logo-black.svg" width="150" />

Note - the API is limited to 100 calls per day. I have 3 API keys that can be revolved and I have also added a test json file for testing purposes.

I have tried to limit the number of calls by using useRef to create a mutable object for the selected option, but this side of things could be improved by caching each option.

## Technologies
I used React to build out the app, applying semantic `HTML`, responsive `CSS`, and `JavaScript` to fetch the data.

## Setup
- download or clone the repository
- run `npm install`
- `npm start` - Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Approach
React hooks used - useState, useEffect, useRef

For CSS, no framework is used. I loosely adopted the `BEM` naming style for CSS class names and imported a reset file from https://piccalil.li/blog/a-more-modern-css-reset/.

With a mobile first approach, I have employed Flexbox and CSS Grid for section layouts in the page.

The HTML follows semantic markup (header, main, footer, section, ul, li, article) to provide information for accessibility.

I used [Axe Devtools](https://www.deque.com/axe/devtools/) to check accessibility and no issues came up.

To output a friendly localised date for articles, I have used the JavaScript native namespace object `Intl`. More information -[Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

## Status
This is a demo product and by no means finished. I welcome any thoughts or suggestions for improving the application.

## Credits
List of contributors:
- [Yorick Brown](theyoricktouch.com)
- [Create React App](https://create-react-app.dev/)

## License

MIT license @ [Yorick Brown](theyoricktouch.com)