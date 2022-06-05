import {ApolloServer, gql} from 'apollo-server-fastify';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import {ApolloServerPlugin} from 'apollo-server-plugin-base';
import fastify, {FastifyInstance} from 'fastify';
import Db from "./config/db";
import {PetController} from "./pet";
import {CustomerController} from "./customers";
import {PocController} from "./poc";
import PocService from "./poc/poc-service";

const pocService = PocService();

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

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

const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
    }

    type Pokemon {
        name: String,
        url: String,
        image: String,
    }

    type RawPokemon {
        url: String,
        image: String,
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book],
        pokemons(times: Int): [Pokemon],
        rawPokemons(times: Int): [RawPokemon],
    }
`;

const resolvers = {
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

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = fastify();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({httpServer: app.server}),
    ],
  });

  await server.start();
  app.register(Db);
  app.register(PetController, {prefix: '/v1'});
  app.register(CustomerController, {prefix: '/v1'});
  app.register(PocController, {prefix: '/v1'});
  app.register(server.createHandler());
  await app.listen(4000);
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
