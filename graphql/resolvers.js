"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const poc_service_1 = __importDefault(require("../poc/poc-service"));
const pocService = (0, poc_service_1.default)();
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
exports.resolvers = {
    Query: {
        books: () => books,
        pokemons: async (parent, args, context, info) => {
            return await pocService.constructedPokemon(args.times);
        },
        rawPokemons: async (parent, args, context, info) => {
            return await pocService.rawPokemon(args.times);
        }
    },
};
