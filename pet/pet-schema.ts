import { Static, Type } from '@sinclair/typebox'

export const Pet = Type.Object({
    name: Type.String(),
    type: Type.Optional(Type.String()),
    ownerID: Type.Optional(Type.String()),
});
export type PetSchema = Static<typeof Pet>;
