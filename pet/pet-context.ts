import {FastifyInstance, FastifyLoggerInstance} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "http";
import {PetSchema} from "./pet-schema";


export default function PetContext(fastify: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>) {
    if (fastify.mongo.db !== undefined) {
        return fastify.mongo.db.collection<PetSchema>('Pets');
    }
    throw new Error('No DB collection found')
}
