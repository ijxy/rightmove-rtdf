import { z } from "zod";

import { exportPeriod } from "../exportPeriod";
import { requestSchema } from "../request";
import { responseSchema } from "../response";

import { email } from "./email";
import { property } from "./property";

export type GetPropertyEmailsRequest = z.input<
  typeof getPropertyEmailsRequestSchema
>;
export const getPropertyEmailsRequestSchema = requestSchema.extend({
  /**
   * Details about which branch's emails are being retrieved
   */
  branch: z.object({
    /**
     * Unique Rightmove reference for this branch
     */
    branch_id: z.number().int(),
  }),

  /**
   * Information about the property for which emails are being exported
   */
  property: z.object({
    /**
     * Agent's unique reference for this property
     */
    agent_ref: z.string().trim().min(1).max(80),
  }),

  /**
   * Defines the period for which emails are being exported
   */
  export_period: exportPeriod.datetime.requestSchema,
});

export type GetPropertyEmailsResponse = z.output<
  typeof getPropertyEmailsResponseSchema
>;
export const getPropertyEmailsResponseSchema = responseSchema.extend({
  /**
   * The current lag time for replicating between the three Rightmove data centres in minutes
   */
  replication_lag: z.number().int().nullish(),

  /**
   * The period for which emails are being exported
   */
  export_period: exportPeriod.datetime.responseSchema.nullish(),

  /**
   * Details about which branch's emails are being retrieved
   */
  branch: z
    .object({
      /**
       * Unique Rightmove ID for the branch for which the emails export is being generated
       */
      branch_id: z.number().int(),
    })
    .nullish(),

  /**
   * Current details for this property on Rightmove
   */
  property: property.responseSchema.nullish(),

  /**
   * Details of all the emails sent for the property during the export period
   */
  emails: z.array(email.responseSchema.omit({ property: true })).nullish(),
});
