import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fp from 'fastify-plugin'

const swaggerPlugin = fp(async (fastify, options) => {
    // Enregistre le plugin Swagger
    fastify.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'API Documentation',
                description: 'Manual API2 documentation example',
                version: '1.0.0',
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                },
            ],
        },
    });

    // Enregistre le plugin Swagger UI
    fastify.register(fastifySwaggerUi, {
        routePrefix: '/docs', // L'interface sera disponible sur /docs
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next() },
            preHandler: function (request, reply, next) { next() }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
        transformSpecificationClone: true
    });
})

export default swaggerPlugin