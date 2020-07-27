import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import { ensureSignedIn } from './auth'
import { APOLLO_OPTIONS, SESS_OPTIONS } from './config'
import schemaDirectives from './directives'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

const createApp = store => {
  const app = express()

  const sessionHandler = session({
    store,
    ...SESS_OPTIONS
  })

  app.use(sessionHandler)

  const server = new ApolloServer({
    ...APOLLO_OPTIONS,
    typeDefs,
    resolvers,
    schemaDirectives,
    context: ({ req, res, connection }) =>
      connection ? connection.context : { req, res },
    subscriptions: {
      onConnect: async (connectionParams, webSocket, { request }) => {
        const req = await new Promise(resolve => {
          sessionHandler(request, {}, () => {
            // Directives are ignored in WS; need to auth explicitly
            ensureSignedIn(request)

            resolve(request)
          })
        })

        return { req }
      }
    }
  })

  server.applyMiddleware({ app, cors: false })

  return { app, server }
}

export default createApp
