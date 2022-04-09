"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PetContext(fastify) {
    if (fastify.mongo.db !== undefined) {
        return fastify.mongo.db.collection('Pets');
    }
    throw new Error('No DB collection found');
}
exports.default = PetContext;
