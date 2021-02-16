const { verify } = require('jsonwebtoken')
const { graphql } = require('graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')

function getUserId(headers) {
  const Authorization = headers.authorization
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, process.env.JWT_SECRET)
    return verifiedToken && verifiedToken.userId
  }
}
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

exports.handler = (request, response, context) => {
  let result
  // request body is a stream. collect it and then do stuff
  let body = ''
  request.on('data', chunk => {
    body += chunk
  })
  request.on('end', async () => {
    try {
      const { query, variables, operationName } = JSON.parse(body)
      context = { userID: getUserId(request.headers) }

      result = await graphql(
        schema,
        query,
        undefined,
        context,
        variables,
        operationName,
      )
      response.setStatusCode(200)
    } catch (error) {
      response.setStatusCode(400)
      result = error
    } finally {
      response.setHeader('content-type', 'application/json')
      response.send(JSON.stringify(result))
    }
  })
}
