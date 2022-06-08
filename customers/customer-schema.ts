import { Static, Type } from '@sinclair/typebox'

export const Customer = Type.Object({
    name: Type.String(),
    email: Type.Optional(Type.String({pattern: 'email'})),
    pets: Type.Optional(Type.Array(Type.String())),
});
export type CustomerSchema = Static<typeof Customer>;
