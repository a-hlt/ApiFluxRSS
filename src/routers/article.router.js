import { createArticle, getArticle } from "../services/article.service.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function articleRoute(fastify, options) {
    fastify.post('/articles', {
        schema: {},
        onRequest: [fastify.authenticate],
        handler: createArticle
    })

    fastify.get('/articles', {
        schema: {},
        onRequest: [fastify.authenticate],
        handler: getArticle
    })
}

//ESM
export default articleRoute;