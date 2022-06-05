"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sleep = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));
function PocService(fastify) {
    const makePokeApi = (number) => {
        return {
            url: `https://pokeapi.co/api/v2/pokemon/${number}`,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`,
        };
    };
    const rawPokemon = async (times) => {
        const resolver = async (times, acc) => {
            if (times === 0) {
                return acc;
            }
            await sleep();
            return resolver(times - 1, [...acc, makePokeApi(times)]);
        };
        return resolver(times, []);
    };
    const constructedPokemon = async (times) => {
        const raw = await rawPokemon(times);
        const pokemons = raw.map((async (pokemon) => {
            const { data } = await (0, axios_1.default)({ method: "get", url: pokemon.url });
            return Object.assign(Object.assign({}, pokemon), { name: data.name });
        }));
        return Promise.all(pokemons);
    };
    return { rawPokemon, constructedPokemon };
}
exports.default = PocService;
