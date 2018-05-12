const db = require("../models")
const scraper = require("../scraper.js")

module.exports = {
	findAll: function(req,res) {
		db.Articles.find({})
			.sort({date: -1})
			.then(articles => res.json(articles))
			.catch(err => res.status(422).json(err))
	},
	scrape: function(req,res) {
		scraper()
		db.Articles.find({})
			.sort({date: -1})
			.then(articles => res.json(articles))
			.catch(err => res.status(422).json(err))
	},
	saveArticle: function(req,res) {
		let id = req.params.id
		console.log(req.body)
		db.Articles.update({"_id": id},{$set: {saved: true}})
			.catch(err => res.status(422).json(err))
	},
	unsaveArticle: function(req,res) {
		let id = req.params.id
		db.Articles.update({"_id": id},{$set: {saved: false}})
			.catch(err => res.status(422).json(err))
	},
	getSavedArticles: function(req,res) {
		db.Articles.find({saved: true})
			.populate('notes')
			.then(articles => res.json(articles))
			.catch(err => res.status(422).json(err))
	},
	addNote: function(req,res) {
		db.Notes.create({ body: req.params.note})
			.then(notes => {return db.Articles.findOneAndUpdate({ _id: req.params.id}, {$push: {notes: notes._id}}, {new: true})})
			.then( (req,res) => { db.Articles.find({saved: true})
				.populate('notes')
				.then(articles => res.json(articles))
				.catch(err => console.log(err))})
			.catch(err => res.status(422).json(err))	
	},
	removeNote: function(req,res) {
		db.Notes.deleteOne({ _id: req.params.id})
			.catch(err => res.status(422).json(err))

		db.Articles.find({saved: true})
			.populate('notes')
			.then(articles => res.json(articles))
			.catch(err => res.status(422).json(err))
	}
}
