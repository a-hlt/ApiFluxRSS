import { createFolder, getFolder, updateFolder } from "../services/folder.service.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function folderRoute(fastify, options) {
    //create Folders
    fastify.post('/folders', createFolder)

    // get all folders
    fastify.get('/folders', getFolder)

    //update name folder
    fastify.patch('/folders/:id', updateFolder);
}

//ESM
export default folderRoute;