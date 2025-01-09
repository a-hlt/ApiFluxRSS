import { createFolder, getFolder, updateFolder } from "../services/folder.service.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function folderRoute(fastify, options) {
    //create Folders
    fastify.post('/folders', {
        schema: {
            description: 'Créer un dossier',
            tags: ['Folders'],
            summary: 'Créer un nouveau dossier',
            body: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Dossier créé avec succès',
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        idUser: { type: 'number' },
                    },
                },
            },
        },
        onRequest: [fastify.authenticate],
        handler: createFolder
    })

    // get all folders
    fastify.get('/folders', {
        schema: {
            description: 'Récupérer tous les dossiers',
            tags: ['Folders'],
            summary: 'Obtenir la liste des dossiers',
            response: {
                200: {
                    description: 'Liste des dossiers',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            user: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    email: { type: 'string' },
                                    name: { type: 'string' },
                                },
                            },
                            article: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number' },
                                        title: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        onRequest: [fastify.authenticate],
        handler: getFolder
    });

    //update name folder
    fastify.patch('/folders/:id', {
        schema: {
            description: 'Mettre à jour le nom d\'un dossier',
            tags: ['Folders'],
            summary: 'Modifier le nom d\'un dossier par son ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number' },
                },
            },
            body: {
                type: 'object',
                required: ['newName'],
                properties: {
                    newName: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Dossier mis à jour avec succès',
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                    },
                },
            },
        },
        onRequest: [fastify.authenticate],
        handler: updateFolder
    });
}

//ESM
export default folderRoute;