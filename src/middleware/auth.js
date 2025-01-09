import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'

const authMiddleware = fp(async (fastify, options) => {
    fastify.register(fastifyJwt, {
        secret: process.env.SECRET_KEY
    })

    fastify.decorate("authenticate", async function (request, reply) {
        console.log("AUTH")
        try {
            await request.jwtVerify()
        } catch (e) {
            return reply.status(401).json({ message: e }) // Return 401 if the token is invalid
        }
    })

})

export default authMiddleware