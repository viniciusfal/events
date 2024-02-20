import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.setErrorHandler((err,_, reply) => {
  if(err instanceof ZodError){
    return reply.status(400).send({message: 'Validation Error', issues: err.format()})
  }

  if(env.NODE_ENV !== 'production') {
    console.error(err)
  }

  return reply.status(500).send({message: 'Internal server error'})
})