import assert from "node:assert";
import crypto from "node:crypto";
import test from "node:test";

import { DateTime } from "luxon";

import {
  DATETIME_FORMAT,
  DATETIME_REGEXP,
  DATE_FORMAT,
  DATE_REGEXP,
  TIME_FORMAT,
  TIME_REGEXP,
} from "../src/schema/datetime";

test("Date/Time Formatting", async (t) => {
  const NOW = DateTime.now();

  await t.test("time", () => {
    for (let i = 0; i < 24 * 60 * 60; i++) {
      const d = NOW.plus({ seconds: i });
      assert(d.isValid, d.invalidExplanation ?? "");

      const f = d.toFormat(TIME_FORMAT);
      assert(RegExp(`^${TIME_REGEXP}$`).test(f), f);
    }
  });

  await t.test("date", () => {
    const start = NOW.minus({ years: 500 });
    const end = NOW.plus({ years: 1000 });
    const n = end.diff(start).as("days");
    for (let i = 0; i < n; i++) {
      const d = start.plus({ days: i });
      assert(d.isValid, d.invalidExplanation ?? "");
      const f = d.toFormat(DATE_FORMAT);
      assert(RegExp(`^${DATE_REGEXP}$`).test(f), f);
    }
  });

  await t.test("datetime", async () => {
    const start = NOW.minus({ years: 250 });
    const end = NOW.plus({ years: 250 });
    for (
      let d = start;
      d < end;
      d = d.plus({
        days: crypto.randomInt(0, 7),
        hours: crypto.randomInt(0, 24),
        minutes: crypto.randomInt(0, 60),
        seconds: crypto.randomInt(0, 60),
        milliseconds: crypto.randomInt(0, 1000),
      })
    ) {
      assert(d.isValid, d.invalidExplanation ?? "");
      const f = d.toFormat(DATETIME_FORMAT);
      assert(RegExp(`^${DATETIME_REGEXP}$`).test(f), f);
    }
  });
});
