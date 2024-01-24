import { z } from "zod";

const summaryViewsResponseSchema = z.object({
  /**
   * The total number of times the property has appeared in a summary view on the requested date
   */
  total_summary_views: z.number().int(),

  /**
   * The total number of times the property has appeared in a summary view on the requested date, when viewed from a desktop PC
   */
  desktop_summary_views: z.number().int(),

  /**
   * The total number of times the property has appeared in a summary view on the requested date, when viewed from a mobile device
   */
  mobile_summary_views: z.number().int(),
});

const detailViewsResponseSchema = z.object({
  /**
   * The total number of detail views of the property on the requested date
   */
  total_detail_views: z.number().int(),

  /**
   * The total number of detail views of the property on the requested date, when viewed from a desktop PC
   */
  desktop_detail_views: z.number().int(),

  /**
   * The total number of detail views of the property on the requested date, when viewed from a mobile device
   */
  mobile_detail_views: z.number().int(),
});

const propertyDailyPerformanceDataResponseSchema = z.object({
  /**
   * Was the property a featured property
   */
  featured_property: z.boolean(),

  /**
   * Was the property a premium listing
   */
  premium_listing: z.boolean(),

  /**
   * Information on a property's summary views on Rightmove on the date specified
   */
  summary_views: summaryViewsResponseSchema.nullish(),

  /**
   * Information on a property's detail views on Rightmove on the date specified
   */
  detail_views: detailViewsResponseSchema.nullish(),
});

export const propertyDailyPerformanceData = {
  responseSchema: propertyDailyPerformanceDataResponseSchema,
};
