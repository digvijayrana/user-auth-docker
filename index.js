require("dotenv").config();
const express = require('express')
const app = express()
const cors =  require('cors')
const PORT  = process.env.PORT  || 3000
const items = require('./routes/items')
const auth = require('./routes/user')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/items/api/v1',items)
app.use('/auth/api/v1',auth)


app.listen(PORT,console.log(`server is running on  PORT ${PORT}`))