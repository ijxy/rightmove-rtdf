import { z } from "zod";

import { date, datetime } from "./datetime";

const dateExportPeriodRequestSchema = z.object({
  /**
   * The date for the start of the export period - this cannot be more than 28 days ago
   */
  start_date: date.requestSchema,

  /**
   * The date for the end of the export period - this cannot be more than 28 days ago
   */
  end_date: date.requestSchema,
});

const dateExportPeriodResponseSchema = z.object({
  /**
   * The start date for the export period
   */
  start_date: date.responseSchema,

  /**
   * The end date for the export period
   */
  end_date: date.responseSchema,
});

const dateExportPeriod = {
  requestSchema: dateExportPeriodRequestSchema,
  responseSchema: dateExportPeriodResponseSchema,
};

const datetimeExportPeriodRequestSchema = z.object({
  /**
   * The timestamp for the start of the export period - this cannot be more than 28 days ago
   */
  start_date_time: datetime.requestSchema,

  /**
   * The timestamp for the end of the export period - this cannot be more than 28 days ago
   */
  end_date_time: datetime.requestSchema,
});

const datetimeExportPeriodResponseSchema = z.object({
  /**
   * The start date/time for the export period
   */
  start_date_time: datetime.responseSchema,

  /**
   * The end date/time for the export period
   */
  end_date_time: datetime.responseSchema,
});

const datetimeExportPeriod = {
  requestSchema: datetimeExportPeriodRequestSchema,
  responseSchema: datetimeExportPeriodResponseSchema,
};

export const exportPeriod = {
  date: dateExportPeriod,
  datetime: datetimeExportPeriod,
};
