import test from "node:test";

import GetBranchPerformanceRequestSchema from "../json-schema/performanceReporting/GetBranchPerformanceRequestSchema.json";
import GetBranchPerformanceResponseSchema from "../json-schema/performanceReporting/GetBranchPerformanceResponseSchema.json";
import GetPropertyPerformanceRequestSchema from "../json-schema/performanceReporting/GetPropertyPerformanceRequestSchema.json";
import GetPropertyPerformanceResponseSchema from "../json-schema/performanceReporting/GetPropertyPerformanceResponseSchema.json";
import {
  getBranchPerformanceRequestSchema,
  getBranchPerformanceResponseSchema,
  getPropertyPerformanceRequestSchema,
  getPropertyPerformanceResponseSchema,
} from "../src";

import { validateZodSchema } from "./validate";

test("Performance Reporting Calls", async (t) => {
  await t.test("GetBranchPerformance", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(getBranchPerformanceRequestSchema, GetBranchPerformanceRequestSchema);
    });

    await tt.test("Response", () => {
      validateZodSchema(getBranchPerformanceResponseSchema, GetBranchPerformanceResponseSchema);
    });
  });

  await t.test("GetPropertyPerformance", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(getPropertyPerformanceRequestSchema, GetPropertyPerformanceRequestSchema);
    });

    await tt.test("Response", () => {
      validateZodSchema(getPropertyPerformanceResponseSchema, GetPropertyPerformanceResponseSchema);
    });
  });
});
