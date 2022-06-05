"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocController = void 0;
const poc_service_1 = __importDefault(require("./poc-service"));
async function PocController(fastify) {
    const pocService = (0, poc_service_1.default)(fastify);
    fastify.get('/poc/:times', async (request, reply) => {
        const { times } = request.params;
        const result = await pocService.rawPokemon(times);
        if (result.length === 0) {
            reply.status(404);
            throw new Error('No documents found');
        }
        reply.status(200).send(result);
    });
    fastify.get('/poc/:times/constructed', async (request, reply) => {
        const { times } = request.params;
        const result = await pocService.constructedPokemon(times);
        if (result.length === 0) {
            reply.status(404);
            throw new Error('No documents found');
        }
        reply.status(200).send(result);
    });
}
exports.PocController = PocController;
