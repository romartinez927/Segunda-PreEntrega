import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { apiRouter } from './routers/api.routes.js'
import { PORT } from '../config/server.config.js'
import { chatRouter } from './routers/chat.routes.js'
import { conectar } from '../database/mongoose.js'
import { viewsRouter } from './routers/views.routes.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from "connect-mongo"
import { URL } from '../config/database.config.js'
import { passportInitialize, passportSession } from './middlewares/passport.js'

await conectar()

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: URL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 100
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

const server = app.listen(PORT)
console.log(`escuchando en PORT ${PORT}`)

export const io = new Server(server)

app.use(passportInitialize, passportSession)

app.use("/api", apiRouter)
app.use("/chat", chatRouter)
app.use("/", viewsRouter)







