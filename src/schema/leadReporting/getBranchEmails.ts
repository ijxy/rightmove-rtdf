import { z } from "zod";

import { exportPeriod } from "../exportPeriod";
import { requestSchema } from "../request";
import { responseSchema } from "../response";

import { email } from "./email";

export type GetBranchEmailsRequest = z.input<
  typeof getBranchEmailsRequestSchema
>;
export const getBranchEmailsRequestSchema = requestSchema.extend({
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
   * Defines the period for which emails are being exported
   */
  export_period: exportPeriod.datetime.requestSchema,
});

export type GetBranchEmailsResponse = z.output<
  typeof getBranchEmailsResponseSchema
>;
export const getBranchEmailsResponseSchema = responseSchema.extend({
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
   * Details of all the emails sent for the branch during the export period
   */
  emails: z.array(email.responseSchema).nullish(),
});
