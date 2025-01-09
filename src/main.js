import Fastify from 'fastify'
import userRoute from './routers/user.router.js'
import folderRoute from './routers/folder.router.js'
import articleRoute from './routers/article.router.js'
import prismaPlugin from './plugins/prisma.js'
import swagger from './plugins/swagger.js';
import auth from './middleware/auth.js';
import 'dotenv/config'



const fastify = Fastify({
    logger: true
})

await fastify.register(auth);

await fastify.register(swagger);
await fastify.register(userRoute);
await fastify.register(folderRoute)
await fastify.register(articleRoute)
await fastify.register(prismaPlugin)

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
        console.log('Server is running at http://localhost:3000');
        console.log('Swagger docs available at http://localhost:3000/docs');
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
