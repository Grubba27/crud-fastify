import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from 'fastify-mongodb'
import {FastifyInstance} from "fastify";

async function dbConnector (fastify: FastifyInstance) {
    fastify.register(fastifyMongo, {
        url: 'mongodb://localhost:27017/PetStore'
    })
}

export default fastifyPlugin(dbConnector)
