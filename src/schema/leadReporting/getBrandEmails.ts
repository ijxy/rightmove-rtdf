import { z } from "zod";

import { exportPeriod } from "../exportPeriod";
import { requestSchema } from "../request";
import { responseSchema } from "../response";

import { email } from "./email";

export type GetBrandEmailsRequest = z.input<typeof getBrandEmailsRequestSchema>;
export const getBrandEmailsRequestSchema = requestSchema.extend({
  /**
   * Details about which brand's emails are being retrieved
   */
  brand: z.object({
    /**
     * Unique Rightmove reference for this brand
     */
    brand_id: z.number().int(),
  }),

  /**
   * Defines the period for which emails are being exported
   */
  export_period: exportPeriod.datetime.requestSchema,
});

export type GetBrandEmailsResponse = z.output<typeof getBrandEmailsResponseSchema>;
export const getBrandEmailsResponseSchema = responseSchema.extend({
  /**
   * The current lag time for replicating between the three Rightmove data centres in minutes
   */
  replication_lag: z.number().int().nullish(),

  /**
   * The period for which emails are being exported
   */
  export_period: exportPeriod.datetime.responseSchema.nullish(),

  /**
   * Details about which brand's emails are being retrieved
   */
  brand: z
    .object({
      /**
       * Unique Rightmove ID for the brand for which the emails export is being generated
       */
      brand_id: z.number().int(),
    })
    .nullish(),

  /**
   * Details about which branch's emails are being retrieved
   */
  branch: z
    .array(
      z.object({
        /**
         * Unique Rightmove ID for the branch for which the emails export is being generated
         */
        branch_id: z.number().int(),

        /**
         * Details of all the emails sent for the branch during the export period
         */
        emails: z.array(email.responseSchema).nullish(),
      }),
    )
    .nullish(),
});
