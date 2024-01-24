import test from "node:test";

import GetBranchPropertyListRequestSchema from "../json-schema/property/GetBranchPropertyListRequestSchema.json";
import GetBranchPropertyListResponseSchema from "../json-schema/property/GetBranchPropertyListResponseSchema.json";
import RemovePropertyRequestSchema from "../json-schema/property/RemovePropertyRequestSchema.json";
import RemovePropertyResponseSchema from "../json-schema/property/RemovePropertyResponseSchema.json";
import SendPropertyDetailsRequestSchema from "../json-schema/property/SendPropertyDetailsRequestSchema.json";
import SendPropertyDetailsResponseSchema from "../json-schema/property/SendPropertyDetailsResponseSchema.json";
import {
  getBranchPropertyListRequestSchema,
  getBranchPropertyListResponseSchema,
  removePropertyRequestSchema,
  removePropertyResponseSchema,
  sendPropertyDetailsRequestSchema,
  sendPropertyDetailsResponseSchema,
} from "../src";

import { validateZodSchema } from "./validate";

test("Product Calls", async (t) => {
  await t.test("GetBranchPropertyList", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(
        getBranchPropertyListRequestSchema,
        GetBranchPropertyListRequestSchema,
      );
    });

    await tt.test("Response", () => {
      validateZodSchema(
        getBranchPropertyListResponseSchema,
        GetBranchPropertyListResponseSchema,
      );
    });
  });

  await t.test("SendPropertyDetails", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(
        sendPropertyDetailsRequestSchema,
        SendPropertyDetailsRequestSchema,
      );
    });

    await tt.test("Response", () => {
      validateZodSchema(
        sendPropertyDetailsResponseSchema,
        SendPropertyDetailsResponseSchema,
      );
    });
  });

  await t.test("RemoveProperty", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(
        removePropertyRequestSchema,
        RemovePropertyRequestSchema,
      );
    });

    await tt.test("Response", () => {
      validateZodSchema(
        removePropertyResponseSchema,
        RemovePropertyResponseSchema,
      );
    });
  });
});
