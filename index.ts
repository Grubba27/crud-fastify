import fastify from 'fastify';
import Db from "./config/db";
import {PetController} from "./pet";
import {CustomerController} from "./customers";

const server = fastify()


server.register(Db)
server.register(PetController, {prefix: '/v1'})
server.register(CustomerController, {prefix: '/v1'})

const start = async () => {
    try {
        await server.listen(3000)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start();
