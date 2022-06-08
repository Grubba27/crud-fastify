import {FastifyInstance, FastifyLoggerInstance} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "http";
import {CustomerSchema} from "./customer-schema";


export default function CustomerContext(fastify: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>) {
    if (fastify.mongo.db !== undefined) {
        return fastify.mongo.db.collection<CustomerSchema>('Customers');
    }
    throw new Error('No DB collection found')
}
