import { z } from "zod";

const propertyRequestSchema = z.object({
  /**
   * Agent's unique reference for this property
   */
  agent_ref: z.string().min(1).max(80),
});

const propertyResponseSchema = z.object({
  /**
   * Agent's unique reference for the property sent in the request
   */
  agent_ref: z.string().nullish(),

  /**
   * Rightmove's unique reference for the property sent in the request
   */
  rightmove_id: z.number().int().nullish(),

  /**
   * The Rightmove URL for the property sent in the request
   */
  rightmove_url: z.string().url().nullish(),
});

export const property = {
  requestSchema: propertyRequestSchema,
  responseSchema: propertyResponseSchema,
};
