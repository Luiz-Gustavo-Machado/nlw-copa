import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';

import { poolRoutes } from './routes/pool';

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true
    })

    fastify.register(poolRoutes)

    await fastify.listen({ port: 3333 /*, host: '0.0.0.0'*/ });
}

bootstrap()