import connectRedis from 'connect-redis'
import session from 'express-session'
import http from 'http'
import Redis from 'ioredis'
import mongoose from 'mongoose'
import createApp from './app'
import { DB_OPTIONS, DB_URI, HTTP_PORT, REDIS_OPTIONS } from './config'
;(async () => {
  try {
    await mongoose.connect(DB_URI, DB_OPTIONS)

    const RedisStore = connectRedis(session)

    const store = new RedisStore({
      client: new Redis(REDIS_OPTIONS)
    })

    const { app, server } = createApp(store)

    const httpServer = http.createServer(app)
    server.installSubscriptionHandlers(httpServer)

    httpServer.listen(HTTP_PORT, () => {
      console.log(`http://localhost:${HTTP_PORT}${server.graphqlPath}`)
      console.log(`ws://localhost:${HTTP_PORT}${server.subscriptionsPath}`)
    })
  } catch (e) {
    console.error(e)
  }
})()
