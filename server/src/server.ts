import { Prisma } from '@prisma/client'
import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    fastify.get('/pools/count', () => {
        return { count: 0 }
    })

    await fastify.listen({ port: 3333});
}

bootstrap()