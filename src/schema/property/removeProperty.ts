import { z } from "zod";

import { datetime } from "../datetime";
import { requestSchema } from "../request";
import { responseSchema } from "../response";

import { Channel, RemovalReason } from "./enums";
import { property } from "./property";

export type RemovePropertyRequest = z.input<typeof removePropertyRequestSchema>;
export const removePropertyRequestSchema = requestSchema.extend({
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
    channel: z.nativeEnum(Channel),
  }),

  /**
   * Information about the property being sent
   */
  property: property.requestSchema.extend({
    /**
     * The agent's reason for removing this property from the site
     */
    removal_reason: z.nativeEnum(RemovalReason).nullish(),

    /**
     * The date the transaction was completed (if applicable)
     */
    transaction_date: datetime.requestSchema.nullish(),
  }),
});

export type RemovePropertyResponse = z.output<typeof removePropertyResponseSchema>;
export const removePropertyResponseSchema = responseSchema.extend({
  /**
   * Information about the property sent in the request
   */
  property: property.responseSchema.nullish(),
});
