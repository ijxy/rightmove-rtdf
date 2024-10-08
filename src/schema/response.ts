import { z } from "zod";

import { datetime } from "./datetime";

export type ResponseError = z.output<typeof errorSchema>;
export const errorSchema = z.object({
  /**
   * The unique Rightmove code for the error causing the request to fail
   */
  error_code: z.string(),

  /**
   * The full description of the error associated with the error code which has been generated
   */
  error_description: z.string(),

  /**
   * The value that caused this error
   */
  error_value: z.string().nullish(),
});

export type ResponseWarning = z.output<typeof warningSchema>;
export const warningSchema = z.object({
  /**
   * The unique Rightmove warning code generated due to failure to pass all of the business rules
   */
  warning_code: z.string(),

  /**
   * The full description of the warning associated with the warning code which has been generated
   */
  warning_description: z.string(),

  /**
   * The value that caused this warning
   */
  warning_value: z.string().nullish(),
});


export type Response = z.output<typeof responseSchema>;
export const responseSchema = z.object({
  /**
   * The message content for the response
   */
  message: z.string(),

  /**
   * The unique ID of the request which this response is associated with
   */
  request_id: z.string(),

  /**
   * Indicates whether or not the request was successful
   */
  success: z.boolean(),

  /**
   * The time at which the request was received
   */
  request_timestamp: datetime.responseSchema,

  /**
   * The time at which the response was sent
   */
  response_timestamp: datetime.responseSchema,

  /**
   * The errors causing the request to fail
   */
  errors: z.array(errorSchema.nullish()).nullish(),

  /**
   * The warning generated by the request
   */
  warnings: z.array(warningSchema.nullish()).nullish(),
});
