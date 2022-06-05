import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import PocService, {PokeApiType} from "./poc-service";


export async function PocController(fastify: FastifyInstance) {

  const pocService = PocService(fastify);

  fastify.get<{ Params: { times: number }, Reply: Array<PokeApiType<number>> }>
  ('/poc/:times',
    async (
      request: FastifyRequest<{ Params: { times: number } }>,
      reply: FastifyReply
    ) => {
      const {times} = request.params;
      const result = await pocService.rawPokemon(times);
      if (result.length === 0) {
        reply.status(404);
        throw new Error('No documents found')
      }
      reply.status(200).send(result);
    });

  fastify.get<{ Params: { times: number }, Reply: Array<PokeApiType<number>> }>
  ('/poc/:times/constructed',
    async (
      request: FastifyRequest<{ Params: { times: number } }>,
      reply: FastifyReply
    ) => {
      const {times} = request.params;
      const result = await pocService.constructedPokemon(times);
      if (result.length === 0) {
        reply.status(404);
        throw new Error('No documents found')
      }
      reply.status(200).send(result);
    });
}
