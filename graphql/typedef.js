"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_fastify_1 = require("apollo-server-fastify");
exports.typeDefs = (0, apollo_server_fastify_1.gql) `
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
