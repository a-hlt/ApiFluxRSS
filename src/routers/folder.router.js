import { createFolder, getFolder } from "../services/folder.service.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function folderRoute(fastify, options) {
    fastify.post('/folders', createFolder)

    fastify.get('/folders', getFolder)
}

//ESM
export default folderRoute;