const router = require('express').Router()
const items = require('../controllers/items')

router.post('/item',items.createItem)
router.get('/items',items.getAllItem)
router.get('/item/:id?',items.getById)
router.delete('/item/:id?',items.deleteItem)
router.patch('/item/:id?',items.updateItem)


module.exports = router