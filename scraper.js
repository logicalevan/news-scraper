const request = require('request')
const cheerio = require('cheerio')
const mongoose = require("mongoose")

const db = require('./models')

const scrape = () => {
	request('https://www.npr.org/sections/news/', (error, response, html) => {
	let $ = cheerio.load(html)

	let results = []

	$("article.item").each( function(i, element) {
		let url = $(element).find('div').find('h2').find('a').attr("href")
		let title = $(element).find('div').find('h2').find('a').text()
		let image = $(element).find('div').find('div').find('a').find('img').attr('src')

		results.push({
			url: url,
			title: title,
			image: image ? image : "",
		})
		db.Articles.create({
			url: url,
			title: title,
			image: image,
		}).then( article => {
		}).catch( err => {
			console.log(err)
		})
	})

	return results
})
}

module.exports = scrape