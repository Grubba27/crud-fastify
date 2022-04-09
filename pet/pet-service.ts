import {FastifyInstance, FastifyLoggerInstance} from "fastify";
import {Server, IncomingMessage, ServerResponse} from "http";
import {PetSchema} from "./pet-schema";
import PetContext from "./pet-context";
import {ObjectId} from "fastify-mongodb";


export default function PetService(
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>
) {
    const db = PetContext(fastify);

    const getAllPets = () => {
        return db.find().toArray();
    }

    const getPetById = (id: string) => {
        return db.findOne(new ObjectId(id))
    }

    const updatePet = (id: string, pet: PetSchema) => {
        return db.findOneAndReplace({_id: new ObjectId(id)}, pet);
    }

    const createPet = (pet: PetSchema) => {
        return db.insertOne(pet);
    }

    return {getAllPets, getPetById, updatePet, createPet}
}
