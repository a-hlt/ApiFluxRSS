// user.router.js

import { createUser, getUsers } from "../services/user.service.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function userRoute(fastify, options) {
    fastify.post('/users', createUser)

    fastify.get('/users', getUsers)
}

//ESM
export default userRoute;