import test from "node:test";

import GetBranchEmailsRequestSchema from "../json-schema/leadReporting/GetBranchEmailsRequestSchema.json";
import GetBranchEmailsResponseSchema from "../json-schema/leadReporting/GetBranchEmailsResponseSchema.json";
import GetBrandEmailsRequestSchema from "../json-schema/leadReporting/GetBrandEmailsRequestSchema.json";
import GetBrandEmailsResponseSchema from "../json-schema/leadReporting/GetBrandEmailsResponseSchema.json";
import GetPropertyEmailsRequestSchema from "../json-schema/leadReporting/GetPropertyEmailsRequestSchema.json";
import GetPropertyEmailsResponseSchema from "../json-schema/leadReporting/GetPropertyEmailsResponseSchema.json";
import {
  getBranchEmailsRequestSchema,
  getBranchEmailsResponseSchema,
  getBrandEmailsRequestSchema,
  getBrandEmailsResponseSchema,
  getPropertyEmailsRequestSchema,
  getPropertyEmailsResponseSchema,
} from "../src";

import { validateZodSchema } from "./validate";

test("Lead Reporting Calls", async (t) => {
  await t.test("GetBranchEmails", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(getBranchEmailsRequestSchema, GetBranchEmailsRequestSchema);
    });

    await tt.test("Response", () => {
      validateZodSchema(getBranchEmailsResponseSchema, GetBranchEmailsResponseSchema);
    });
  });

  await t.test("GetBrandEmails", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(getBrandEmailsRequestSchema, GetBrandEmailsRequestSchema);
    });

    await tt.test("Response", () => {
      validateZodSchema(getBrandEmailsResponseSchema, GetBrandEmailsResponseSchema);
    });
  });

  await t.test("GetPropertyEmails", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(getPropertyEmailsRequestSchema, GetPropertyEmailsRequestSchema);
    });

    await tt.test("Response", () => {
      validateZodSchema(getPropertyEmailsResponseSchema, GetPropertyEmailsResponseSchema);
    });
  });
});
