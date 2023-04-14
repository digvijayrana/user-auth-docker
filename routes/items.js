const router = require('express').Router()
const items = require('../controllers/items')

router.post('/',items.createItem)
router.get('/',items.getAllItem)
router.get('/:id?',items.getById)
router.delete('/:id?',items.deleteItem)
router.patch('/:id?',items.updateItem)


module.exports = router