import {PetSchema} from "./pet-schema";
import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
} from "fastify";
import PetService from "./pet-service";

export async function PetController(fastify: FastifyInstance) {

    const petService = PetService(fastify);

    fastify.get<{ Reply: Array<PetSchema> }>
    ('/pets', async (
        request: FastifyRequest, reply: FastifyReply
    ) => {
        const result = await petService.getAllPets()
        if (result.length === 0) {
            reply.status(404);
            throw new Error('No documents found')
        }
        reply.status(200).send(result);
    });

    fastify.get<{ Params: { petID: string }, Reply: PetSchema }>
    ('/pets/:petID', async (
        request: FastifyRequest<{ Params: { petID: string } }>,
        reply: FastifyReply
    ) => {
        const {petID} = request.params;
        const result = await petService.getPetById(petID);
        if (!result) {
            reply.status(404).send(petID);
            throw new Error('Invalid value');
        }
        reply.status(200).send(result);
    });

    fastify.put<{ Body: PetSchema, Reply: PetSchema, Params: { petID: string } }>
    ('/pets/:petID', async (
        request: FastifyRequest<{ Body: PetSchema, Params: { petID: string } }>,
        reply: FastifyReply
    ) => {
        const {petID} = request.params;
        const pet = request.body;
        const result = await petService.updatePet(petID, pet);
        if (result.ok === 0) {
            reply.status(400).send(pet);
        }
        reply.status(200).send(pet);
    });

    fastify.post<{ Body: PetSchema, Reply: PetSchema }>
    ('/pets', async (
        request: FastifyRequest<{ Body: PetSchema, Reply: PetSchema }>,
        reply: FastifyReply
    ) => {
        const pet = request.body;
        const createdPet = await petService.createPet(pet);
        reply.status(200).send(createdPet);
    });
}
