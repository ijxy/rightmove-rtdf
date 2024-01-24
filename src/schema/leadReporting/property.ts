import { z } from "zod";

import { Property } from "../property";

const propertyResponseSchema = z.object({
  /**
   * Agent's unique reference for the property
   */
  agent_ref: z.string(),

  /**
   * Rightmove's unique reference for the property
   */
  rightmove_id: z.number().int(),

  /**
   * The Rightmove URL for the property
   */
  rightmove_url: z.string().url(),

  /**
   * The current listed price for the property on Rightmove
   */
  price: z.number().int(),

  /**
   * The postcode provided for the property
   */
  postcode: z.string(),

  /**
   * The number of bedrooms the property has
   */
  bedrooms: z.number().int(),

  /**
   * The style for the property listing. Applies to New Homes Developments only
   */
  style: z.string().nullish(),

  /**
   * The type of the property
   */
  property_type: z.nativeEnum(Property.Type),
});

export const property = {
  responseSchema: propertyResponseSchema,
};
