const router = require('express').Router()
const postController = require('../controllers/postController.js')


router.route('/api/getAll').get(postController.findAll)

router.route('/api/scrape').get(postController.scrape)

router.route('/api/article/add/:id').post(postController.saveArticle)

router.route('/api/article/delete/:id').post(postController.unsaveArticle)

router.route('/api/getSaved').get(postController.getSavedArticles)

router.route('/api/note/add/:id/:note').post(postController.addNote)

router.route('/api/note/delete/:id').post(postController.removeNote)


module.exports = router
