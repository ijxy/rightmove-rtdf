import { DateTime } from "luxon";
import { z } from "zod";

const HH = "([01][0-9]|2[0-3])";
const mm = "([0-5][0-9])";
const ss = "([0-5][0-9])";
// const SSS = "([0-9]{3})";

const yyyy = "([0-9]{4})";
const yyyy_leap_century = `((0[048]|[13579][26]|[2468][048])00)`; // a multiple of 400, valid up to 9999
const yyyy_leap_noncentury = `([0-9]{2}(0[48]|[13579][26]|[2468][048]))`; // a non-century multiple of 4, valid up to 9999
const yyyy_leap = `(${yyyy_leap_noncentury}|${yyyy_leap_century})`;

const dd_31 = "(0[1-9]|[12][0-9]|3[01])";
const dd_30 = "(0[1-9]|[12][0-9]|30)";
const dd_28 = "(0[1-9]|1[0-9]|2[0-8])";
const dd_29 = "(0[1-9]|[12][0-9])";

const MM_31 = "(01|03|05|07|08|10|12)";
const MM_30 = "(04|06|09|11)";
const MM_28 = "(02)";
const MM_29 = "(02)";

export const TIME_FORMAT = "HH:mm:ss";
export const TIME_REGEXP = `(${HH}:${mm}:${ss})`;

export const DATE_FORMAT = "dd-MM-yyyy";
export const DATE_REGEXP = `((${dd_31}-${MM_31}-${yyyy})|(${dd_30}-${MM_30}-${yyyy})|(${dd_28}-${MM_28}-${yyyy})|(${dd_29}-${MM_29}-${yyyy_leap}))`;

export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
export const DATETIME_REGEXP = `(${DATE_REGEXP} ${TIME_REGEXP})`;

const RIGHTMOVE_IANA_ZONE = "Europe/London";

function toRightmoveDateString(d: Date): string {
  return DateTime.fromJSDate(d, {
    zone: RIGHTMOVE_IANA_ZONE,
  }).toFormat(DATE_FORMAT);
}

function toRightmoveDateTimeString(d: Date): string {
  return DateTime.fromJSDate(d, {
    zone: RIGHTMOVE_IANA_ZONE,
  }).toFormat(DATETIME_FORMAT);
}

function fromRightmoveDateString(s: string): string {
  return DateTime.fromFormat(s, DATE_FORMAT, {
    zone: RIGHTMOVE_IANA_ZONE,
  })
    .toJSDate()
    .toISOString();
}

function fromRightmoveDateTimeString(s: string): string {
  return DateTime.fromFormat(s, DATETIME_FORMAT, {
    zone: RIGHTMOVE_IANA_ZONE,
  })
    .toJSDate()
    .toISOString();
}

export const date = {
  requestSchema: z.date().transform(toRightmoveDateString),
  responseSchema: z
    .string()
    .regex(RegExp(`^${DATE_REGEXP}$`))
    .transform(fromRightmoveDateString),
};

export const datetime = {
  requestSchema: z.date().transform(toRightmoveDateTimeString),
  responseSchema: z
    .string()
    .regex(RegExp(`^${DATETIME_REGEXP}$`))
    .transform(fromRightmoveDateTimeString),
};
