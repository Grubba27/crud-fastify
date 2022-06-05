import {FastifyInstance, FastifyLoggerInstance} from "fastify";
import {IncomingMessage, Server, ServerResponse} from "http";
import axios, {AxiosResponse} from "axios";

const sleep = (ms: number = 100) => new Promise(resolve => setTimeout(resolve, ms));

export default function PocService(
  fastify?: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>
) {
  const makePokeApi = (number: number): PokeApiType<typeof number> => {
    return {
      url: `https://pokeapi.co/api/v2/pokemon/${number}`,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`,
    }
  }
  const rawPokemon = async (times: number): Promise<Array<PokeApiType<number>>> => {
    const resolver = async (times: number, acc: Array<PokeApiType<typeof times>>): Promise<Array<PokeApiType<number>>> => {
      if (times === 0) {
        return acc;
      }
      await sleep();
      return resolver(times - 1, [...acc, makePokeApi(times)]);
    }
    return resolver(times, []);
  }

  const constructedPokemon = async (times: number): Promise<Array<PokeApiType<number>>> => {
    const raw = await rawPokemon(times);
    const pokemons =  raw.map((
      async (pokemon: PokeApiType<number>) => {
       const {data} = await axios({method: "get", url: pokemon.url});
        return {
          ...pokemon,
          name: data.name
        }
      }
    ));
    return Promise.all(pokemons);
  }

  return {rawPokemon, constructedPokemon};
}


export type PokeApiType<T extends number> = {
  url: `https://pokeapi.co/api/v2/pokemon/${T}`,
  name?: string,
  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${T}.png`
}


