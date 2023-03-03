
const router = require('express').Router()
const User = require('../controllers/user')

router.post('/signup',User.register)
router.post('/login',User.login)

module.exports = router



