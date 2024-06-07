import { DateTime } from "luxon";
import { customDateTime } from "regex-datetime";
import { z } from "zod";

const TIME_FORMAT = "HH:mm:ss";

const DATE_FORMAT = "dd-MM-yyyy";

const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

const RIGHTMOVE_IANA_ZONE = "Europe/London";

const DATE_REGEXP = customDateTime(({ YYYY, MM, DD }) => `${DD}-${MM}-${YYYY}`);
const DATETIME_REGEXP = customDateTime(({ YYYY, MM, DD, hh, mm, ss }) => {
  return `${DD}-${MM}-${YYYY} ${hh}:${mm}:${ss}`;
});

function toRightmoveDateString(d: Date): string {
  return DateTime.fromJSDate(d, { zone: RIGHTMOVE_IANA_ZONE }).toFormat(DATE_FORMAT);
}

function toRightmoveDateTimeString(d: Date): string {
  return DateTime.fromJSDate(d, { zone: RIGHTMOVE_IANA_ZONE }).toFormat(DATETIME_FORMAT);
}

function fromRightmoveDateString(s: string): string {
  return DateTime.fromFormat(s, DATE_FORMAT, { zone: RIGHTMOVE_IANA_ZONE })
    .toJSDate()
    .toISOString();
}

function fromRightmoveDateTimeString(s: string): string {
  return DateTime.fromFormat(s, DATETIME_FORMAT, {}).toJSDate().toISOString();
}

export const date = {
  requestSchema: z.date().transform(toRightmoveDateString),
  responseSchema: z.string().regex(DATE_REGEXP()).transform(fromRightmoveDateString),
};

export const datetime = {
  requestSchema: z.date().transform(toRightmoveDateTimeString),
  responseSchema: z.string().regex(DATETIME_REGEXP()).transform(fromRightmoveDateTimeString),
};
