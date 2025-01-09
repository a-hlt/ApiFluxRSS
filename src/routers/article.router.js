import { createArticle, getArticle } from "../services/article.service.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function articleRoute(fastify, options) {
    fastify.post('/articles', {
        schema: {
            description: 'Créer un article',
            tags: ['Articles'],
            summary: 'Créer un nouvel article',
            body: {
                type: 'object',
                required: ['name', 'idFolder', 'resume', 'link'],
                properties: {
                    name: { type: 'string' },
                    idFolder: { type: 'number' },
                    resume: { type: 'string' },
                    link: { type: 'string', format: 'uri' },
                },
            },
            response: {
                200: {
                    description: 'Article créé avec succès',
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        resume: { type: 'string' },
                        link: { type: 'string' },
                        idFolder: { type: 'number' },
                    },
                },
            },
        },
        onRequest: [fastify.authenticate],
        handler: createArticle
    })

    fastify.get('/articles', {
        schema: {
            description: 'Récupérer tous les articles',
            tags: ['Articles'],
            summary: 'Obtenir la liste des articles',
            response: {
                200: {
                    description: 'Liste des articles',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            resume: { type: 'string' },
                            link: { type: 'string', format: 'uri' },
                            folder: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    name: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
        onRequest: [fastify.authenticate],
        handler: getArticle
    });
}

//ESM
export default articleRoute;