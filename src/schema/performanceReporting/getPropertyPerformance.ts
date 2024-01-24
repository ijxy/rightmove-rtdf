import { z } from "zod";

import { date } from "../datetime";
import { exportPeriod } from "../exportPeriod";
import { requestSchema } from "../request";
import { responseSchema } from "../response";

import { propertyDailyPerformanceData } from "./propertyDailyPerformanceData";

export type GetPropertyPerformanceRequest = z.input<
  typeof getPropertyPerformanceRequestSchema
>;
export const getPropertyPerformanceRequestSchema = requestSchema.extend({
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
   * Information about the property for which performance metrics are being exported
   */
  property: z.object({
    /**
     * Agent's unique reference for this property
     */
    agent_ref: z.string().min(1).max(80),
  }),

  /**
   * Defines the period for which property performance metrics are being requested for
   */
  export_period: exportPeriod.date.requestSchema,
});

export type GetPropertyPerformanceResponse = z.output<
  typeof getPropertyPerformanceResponseSchema
>;
export const getPropertyPerformanceResponseSchema = responseSchema.extend({
  /**
   * The current lag time for replicating between the three Rightmove data centres in minutes
   */
  replication_lag: z.number().int().nullish(),

  /**
   * The period for which property performance metrics are being exported
   */
  export_period: exportPeriod.date.responseSchema.nullish(),

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
   * Details of the property which the performance metrics are being generated
   */
  property: z
    .object({
      /**
       * Agent's unique reference for the property
       */
      agent_ref: z.string(),
    })
    .nullish(),

  /**
   * The total number of times a property has been viewed on Rightmove on the dates specified
   */
  property_views_daily: z
    .array(
      propertyDailyPerformanceData.responseSchema.extend({
        /**
         * The date property performance metrics have been requested for
         */
        date: date.responseSchema,
      }),
    )
    .min(0)
    .max(28)
    .nullish(),
});
