import test from "node:test";

import AddFeaturedPropertyRequestSchema from "../json-schema/product/AddFeaturedPropertyRequestSchema.json";
import AddFeaturedPropertyResponseSchema from "../json-schema/product/AddFeaturedPropertyResponseSchema.json";
import AddPremiumListingRequestSchema from "../json-schema/product/AddPremiumListingRequestSchema.json";
import AddPremiumListingResponseSchema from "../json-schema/product/AddPremiumListingResponseSchema.json";
import RemoveFeaturedPropertyRequestSchema from "../json-schema/product/RemoveFeaturedPropertyRequestSchema.json";
import RemoveFeaturedPropertyResponseSchema from "../json-schema/product/RemoveFeaturedPropertyResponseSchema.json";
import {
  addFeaturedPropertyRequestSchema,
  addFeaturedPropertyResponseSchema,
  addPremiumListingRequestSchema,
  addPremiumListingResponseSchema,
  removeFeaturedPropertyRequestSchema,
  removeFeaturedPropertyResponseSchema,
} from "../src";

import { validateZodSchema } from "./validate";

test("Product Calls", async (t) => {
  await t.test("AddFeaturedProperty", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(
        addFeaturedPropertyRequestSchema,
        AddFeaturedPropertyRequestSchema,
      );
    });

    await tt.test("Response", () => {
      validateZodSchema(
        addFeaturedPropertyResponseSchema,
        AddFeaturedPropertyResponseSchema,
      );
    });
  });

  await t.test("AddPremiumListing", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(
        addPremiumListingRequestSchema,
        AddPremiumListingRequestSchema,
      );
    });

    await tt.test("Response", () => {
      validateZodSchema(
        addPremiumListingResponseSchema,
        AddPremiumListingResponseSchema,
      );
    });
  });

  await t.test("RemoveFeaturedProperty", async (tt) => {
    await tt.test("Request", () => {
      validateZodSchema(
        removeFeaturedPropertyRequestSchema,
        RemoveFeaturedPropertyRequestSchema,
      );
    });

    await tt.test("Response", () => {
      validateZodSchema(
        removeFeaturedPropertyResponseSchema,
        RemoveFeaturedPropertyResponseSchema,
      );
    });
  });
});
