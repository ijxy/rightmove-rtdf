import { z } from "zod";

import { date } from "../datetime";
import { Property } from "../property";
import { requestSchema } from "../request";
import { responseSchema } from "../response";

import { propertyDailyPerformanceData } from "./propertyDailyPerformanceData";

export type GetBranchPerformanceRequest = z.input<
  typeof getBranchPerformanceRequestSchema
>;
export const getBranchPerformanceRequestSchema = requestSchema.extend({
  /**
   * Details about which branch's performance metrics are being retrieved
   */
  branch: z.object({
    /**
     * Unique Rightmove reference for this branch
     */
    branch_id: z.number().int(),
  }),

  /**
   * The date for the export period - this cannot be more than 28 days ago
   */
  export_date: date.requestSchema,
});

export type GetBranchPerformanceResponse = z.output<
  typeof getBranchPerformanceResponseSchema
>;
export const getBranchPerformanceResponseSchema = responseSchema.extend({
  /**
   * The current lag time for replicating between the three Rightmove data centres in minutes
   */
  replication_lag: z.number().int().nullish(),

  /**
   * The date for the export period
   */
  export_date: date.responseSchema.nullish(),

  /**
   * Information about the branch for which the metrics are being generated
   */
  branch: z
    .object({
      /**
       * Unique Rightmove ID for the branch for which the performance metrics are being generated
       */
      branch_id: z.number().int(),
    })
    .nullish(),

  /**
   * Branch performance data, for the selected export date
   */
  performance_data: z
    .object({
      /**
       * The total number of email leads received for a given branch, on the specified day
       */
      email_leads: z.number().int(),

      /**
       * The total number of phone leads received for a given branch, on the specified day
       */
      phone_leads: z.number().int(),

      /**
       * Details about performance by property on Rightmove
       */
      property_data: z.array(
        propertyDailyPerformanceData.responseSchema.extend({
          /**
           * The agent's unique reference for the property
           */
          agent_ref: z.string(),

          /**
           * The display address of the property on Rightmove
           */
          display_address: z.string(),

          /**
           * The current listed price for the property on Rightmove
           */
          price: z.number().int(),

          /**
           * For dual branches it specifies the channel of the property
           */
          channel: z.nativeEnum(Property.Channel).nullish(),

          /**
           * Rightmove's unique reference for the property
           */
          rightmove_id: z.number().int(),

          /**
           * The Rightmove URL for the property
           */
          rightmove_url: z.string().url(),
        }),
      ),
    })
    .nullish(),
});
