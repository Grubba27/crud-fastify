import {ApolloServer, gql} from 'apollo-server-fastify';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import {ApolloServerPlugin} from 'apollo-server-plugin-base';
import fastify, {FastifyInstance} from 'fastify';
import {PocController} from "./poc";
import {resolvers} from "./graphql/resolvers";
import {typeDefs} from "./graphql/typedef";
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

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = fastify();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({httpServer: app.server}),
    ],
  });

  await server.start();
  //disable cors
  app.register(
    server
      .createHandler({
        cors: {
          origin: false,
        }
      }));
 // app.register(Db);
  //app.register(PetController, {prefix: '/v1'});
  //app.register(CustomerController, {prefix: '/v1'});
  app.register(PocController, {prefix: '/v1'});
  const port = process.env.PORT || 8080;
  await app.listen(port, process.env.HOST || '0.0.0.0');
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
