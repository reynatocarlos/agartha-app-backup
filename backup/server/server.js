const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')

// App Config

const app = express()
const dbConnection = require('./config/databaseConfig')

dotenv.config()
dbConnection()

// App Middlewares

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// App Routes

const accountRoutes = require('./api/routes/accountRoutes')
const postRoutes = require('./api/routes/postRoutes')

app.use('/api/accounts', accountRoutes)
app.use('/api/feed', postRoutes)

// App Listener

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`))