import { z } from "zod";

import { Property } from "../property";
import { requestSchema } from "../request";
import { responseSchema } from "../response";

import { property } from "./property";

export type RemoveFeaturedPropertyRequest = z.input<typeof removeFeaturedPropertyRequestSchema>;
export const removeFeaturedPropertyRequestSchema = requestSchema.extend({
  /**
   * Information about the branch loading this property
   */
  branch: z.object({
    /**
     * Unique Rightmove reference for this branch
     */
    branch_id: z.number().int(),

    /**
     * Defines whether this is the sales or lettings channel for a branch
     */
    channel: z.nativeEnum(Property.Channel),
  }),

  /**
   * Information about the property being sent
   */
  property: property.requestSchema,
});

export type RemoveFeaturedPropertyResponse = z.output<typeof removeFeaturedPropertyResponseSchema>;
export const removeFeaturedPropertyResponseSchema = responseSchema.extend({
  /**
   * Information about the property sent in the request
   */
  property: property.responseSchema.nullish(),
});
