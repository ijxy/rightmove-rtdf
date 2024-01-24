import { z } from "zod";

import { Property } from "../property";
import { requestSchema } from "../request";
import { responseSchema } from "../response";

import { FeaturedPropertyType } from "./enums";
import { property } from "./property";

export type AddFeaturedPropertyRequest = z.input<
  typeof addFeaturedPropertyRequestSchema
>;
export const addFeaturedPropertyRequestSchema = requestSchema.extend({
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
  property: property.requestSchema.extend({
    /**
     * Information about featured property product
     */
    featured_property: z.object({
      /**
       * Defines featured property product is applied
       */
      featured_property_type: z.nativeEnum(FeaturedPropertyType),
    }),
  }),
});

export type AddFeaturedPropertyResponse = z.output<
  typeof addFeaturedPropertyResponseSchema
>;
export const addFeaturedPropertyResponseSchema = responseSchema.extend({
  /**
   * Information about the property sent in the request
   */
  property: property.responseSchema.nullish(),
});
