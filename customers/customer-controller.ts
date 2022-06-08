import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import CustomerService from "./customer-service";
import {CustomerSchema} from "./customer-schema";
import PetService from "../pet/pet-service";


export async function CustomerController(fastify: FastifyInstance) {


    const customerService = CustomerService(fastify);
    const petService = PetService(fastify);

    fastify.get<{ Reply: Array<CustomerSchema> }>
    ('/customers',
        async (
            request: FastifyRequest, reply: FastifyReply
        ) => {
            const result = await customerService.getAllCustomers()
            if (result.length === 0) {
                reply.status(404);
                throw new Error('No documents found')
            }
            reply.status(200).send(result);
        });

    fastify.get<{ Params: { customerID: string }, Reply: CustomerSchema }>
    ('/customers/:customerID',
        async (
            request: FastifyRequest<{ Params: { customerID: string } }>,
            reply: FastifyReply
        ) => {
            const {customerID} = request.params;
            const result = await customerService.getCustomerById(customerID);
            if (!result) {
                reply.status(404).send(customerID);
                throw new Error('Invalid value');
            }
            reply.status(200).send(result);
        });

    fastify.get<{ Params: { customerID: string }, Reply: CustomerSchema }>
    ('/customers/:customerID/pets',
        async (
            request: FastifyRequest<{ Params: { customerID: string } }>,
            reply: FastifyReply
        ) => {
            const {customerID} = request.params;
            const customer = await customerService.getCustomerById(customerID);

            if (!customer) {
                reply.status(404).send('Invalid user id');
                throw new Error('Invalid user id');
            }

            if (customer.pets === undefined || customer.pets?.length === 0) {
                reply.status(400).send('No pets were added');
                throw new Error('No pets were added');
            }

            const res = await petService.getPetsByIds(customer.pets).toArray();

            if (res === null) {
                reply.status(500).send('DB broke');
                throw new Error('Something is wrong');
            }
            reply.status(200).send(res);
        });

    fastify.put<{ Body: CustomerSchema, Reply: CustomerSchema, Params: { customerID: string } }>
    ('/customers/:customerID',
        async (
            request: FastifyRequest<{ Body: CustomerSchema, Params: { customerID: string } }>,
            reply: FastifyReply
        ) => {
            const {customerID} = request.params;
            const customer = request.body;
            const result = await customerService.updateCustomer(customerID, customer);
            if (result.ok === 0) {
                reply.status(400).send(customer);
            }
            reply.status(200).send(customer);
        });

    fastify.post<{ Body: CustomerSchema, Reply: CustomerSchema }>
    ('/customers',
        async (
            request: FastifyRequest<{ Body: CustomerSchema, Reply: CustomerSchema }>,
            reply: FastifyReply
        ) => {
            const customer = request.body;
            const createdCustomer = await customerService.createCustomer(customer);
            reply.status(200).send(createdCustomer);
        });
}
