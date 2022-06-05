import PocService from "../poc/poc-service";

const pocService = PocService();


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

export const resolvers = {
  Query: {
    books: () => books,
    pokemons: async (parent: any, args: any, context: any, info: any) => {
      return await pocService.constructedPokemon(args.times);
    },
    rawPokemons: async (parent: any, args: any, context: any, info: any) => {
      return await pocService.rawPokemon(args.times);
    }
  },
};
