// user.router.js

import auth from "../middleware/auth.js";
import { createUser, getUsers, updateUser, loginUser } from "../services/user.service.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function userRoute(fastify, options) {

    // Créer un utilisateur
    fastify.post('/register', {
        schema: {
            description: 'Créer un utilisateur',
            tags: ['Users'],
            summary: 'Créer un nouvel utilisateur',
            body: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 },
                },
            },
            response: {
                201: {
                    description: 'Utilisateur créé avec succès',
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                    },
                },
            },
        },
        handler: createUser,
    });

    // Récupérer tous les utilisateurs
    fastify.get('/users', {
        schema: {
            description: 'Récupérer tous les utilisateurs',
            tags: ['Users'],
            summary: 'Obtenir la liste des utilisateurs',
            response: {
                200: {
                    description: 'Liste des utilisateurs',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            email: { type: 'string' },
                            folders: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    name: { type: 'string' }
                                }
                            }
                        },
                    },
                },
            },
        },
        onRequest: [fastify.authenticate],
        handler: getUsers,
    });

    // Mettre à jour le nom d'un utilisateur
    fastify.patch('/users', {
        schema: {
            description: 'Mettre à jour le nom d\'un utilisateur',
            tags: ['Users'],
            summary: 'Modifier le nom d\'un utilisateur par son ID',
            body: {
                type: 'object',
                required: ['newName'],
                properties: {
                    newName: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Utilisateur mis à jour avec succès',
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                    },
                },
            },
        },
        onRequest: [fastify.authenticate],
        handler: updateUser,
    });

    fastify.post('/login', {
        schema: {},
        handler: loginUser,
    })

}

// ESM
export default userRoute;
