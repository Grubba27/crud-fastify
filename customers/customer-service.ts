import {FastifyInstance, FastifyLoggerInstance} from "fastify";
import {Server, IncomingMessage, ServerResponse} from "http";
import {ObjectId} from "fastify-mongodb";
import CustomerContext from "./customer-context";
import {CustomerSchema} from "./customer-schema";


export default function CustomerService(
    fastify: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>
) {
    const db = CustomerContext(fastify);

    const getAllCustomers = () => {
        return db.find().toArray();
    }

    const getCustomerById = (id: string) => {
        return  db.findOne({_id: new ObjectId(id)});
    }

    const updateCustomer = (id: string, customer: CustomerSchema) => {
        return db.findOneAndReplace({_id: new ObjectId(id)}, customer);
    }

    const createCustomer = (customer: CustomerSchema) => {
        return db.insertOne(customer);
    }

    return {getAllCustomers, getCustomerById, updateCustomer, createCustomer};
}
