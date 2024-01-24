import assert from "node:assert";

import { generateMock } from "@anatine/zod-mock";
import Ajv, { Schema } from "ajv";
import { z } from "zod";

export function validateZodSchema(zodSchema: z.Schema, jsonSchema: Schema) {
  const ajv = new Ajv();
  const request = generateMock(zodSchema);
  const valid = ajv.validate(jsonSchema, request);
  assert(valid, ajv.errorsText(ajv.errors));
}
