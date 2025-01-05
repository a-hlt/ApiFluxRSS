import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

const prismaPlugin = fp(async (server, options) => {
    const prisma = new PrismaClient({
        log: ['query', 'info', 'error', 'warn'],
    })

    await prisma.$connect()

    server.decorate('prisma', prisma)

    server.addHook('onClose', async (server) => {
        server.log.info('disconnecting Prisma from DB')
        await server.prisma.$disconnect()
    })
})

export default prismaPlugin