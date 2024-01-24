import { z } from "zod";

import { datetime } from "../datetime";
import { requestSchema } from "../request";
import { responseSchema } from "../response";

import { Channel } from "./enums";

export type GetBranchPropertyListRequest = z.input<
  typeof getBranchPropertyListRequestSchema
>;
export const getBranchPropertyListRequestSchema = requestSchema.extend({
  /**
   * Information about the branch loading this property list
   */
  branch: z.object({
    /**
     * Unique Rightmove reference for this branch
     */
    branch_id: z.number().int(),

    /**
     * For dual branches it allows to retrieve all the properties for a specific chanel
     */
    channel: z.nativeEnum(Channel).nullish(),
  }),
});

export type GetBranchPropertyListResponse = z.output<
  typeof getBranchPropertyListResponseSchema
>;
export const getBranchPropertyListResponseSchema = responseSchema.extend({
  /**
   * Information about the branch sent in the request
   */
  branch: z
    .object({
      /**
       * Unique Rightmove ID for the branch sent in the request
       */
      branch_id: z.number().int(),

      /**
       * For dual branches it allows to retrieve all the properties for a specific channel
       */
      channel: z.nativeEnum(Channel).nullish(),
    })
    .nullish(),

  /**
   * The list of live properties on Rightmove for the branch sent in the request
   */
  property: z
    .array(
      z.object({
        /**
         * Rightmove's unique reference for this property
         */
        rightmove_id: z.number().int(),

        /**
         * The agent's unique reference for this property
         */
        agent_ref: z.string(),

        /**
         * The last update date provided for this property
         */
        update_date: datetime.responseSchema.nullish(),

        /**
         * The channel for this property
         */
        channel: z.nativeEnum(Channel),
      }),
    )
    .nullish(),
});
