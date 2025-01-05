import Fastify from 'fastify'
import userRoute from './routers/user.router.js'
import folderRoute from './routers/folder.router.js'
import articleRoute from './routers/article.router.js'
import prismaPlugin from './plugins/prisma.js'

const fastify = Fastify({
    logger: true
})

fastify.register(userRoute)
fastify.register(folderRoute)
fastify.register(articleRoute)
fastify.register(prismaPlugin)

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
