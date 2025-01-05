// user.router.js

import { createUser, getUsers, updateUser } from "../services/user.service.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function userRoute(fastify, options) {
    //create Users
    fastify.post('/users', createUser)

    //get all users
    fastify.get('/users', getUsers)

    //update name User
    fastify.patch('/users/:id', updateUser);
}

//ESM
export default userRoute;