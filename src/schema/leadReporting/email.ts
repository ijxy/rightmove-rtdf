import { z } from "zod";

import { datetime } from "../datetime";
import { unique } from "../utils";

import {
  EmailType,
  UserMoveDate,
  UserPropertyToRentStatus,
  UserPropertyToSellStatus,
} from "./enums";
import { property } from "./property";

const userContactDetailsResponseSchema = z.object({
  /**
   * The user's title
   */
  title: z.string().nullish(),

  /**
   * The user's first name
   */
  first_name: z.string().nullish(),

  /**
   * The user's last name
   */
  last_name: z.string().nullish(),

  /**
   * The user's address
   */
  address: z.string().nullish(),

  /**
   * The user's postcode
   */
  postcode: z.string().nullish(),

  /**
   * The user's country of residence
   */
  country: z.string().nullish(),

  /**
   * The user's daytime telephone number
   */
  phone_day: z.string().nullish(),

  /**
   * The user's evening telephone number
   */
  phone_evening: z.string().nullish(),

  /**
   * Indicates whether the user wishes for their data to be protected
   */
  dpa_flag: z.boolean().nullish(),
});

const userInformationResponseSchema = z.object({
  /**
   * The date the user is looking to move
   */
  move_date: z.nativeEnum(UserMoveDate).nullish(),

  /**
   * Why the user is looking to move
   */
  moving_reason: z.string().nullish(),

  /**
   * Indicates whether the user has a property to sell
   */
  property_to_sell: z.nativeEnum(UserPropertyToSellStatus).nullish(),

  /**
   * Indicates whether the user has a property to rent
   */
  property_to_rent: z.nativeEnum(UserPropertyToRentStatus).nullish(),

  /**
   * Indicates whether the user wants financial advice
   */
  financial_advice: z.boolean().nullish(),

  /**
   * Indicates whether the user is interested in part exchange
   */
  part_exchange: z.boolean().nullish(),

  /**
   * Any further comments which the user has included
   */
  comments: z.string().nullish(),
});

const userResponseSchema = z.object({
  /**
   * The user's contact information
   */
  user_contact_details: userContactDetailsResponseSchema,

  /**
   * The information which the user provided within the email
   */
  user_information: userInformationResponseSchema,
});

const emailResponseSchema = z.object({
  /**
   * Unique Rightmove identifier for this email
   */
  email_id: z.number().int(),

  /**
   * The email address which the email came from
   */
  from_address: z.string().email(),

  /**
   * The email address which the email was sent to
   */
  to_address: z.string().email(),

  /**
   * The date the original email was sent
   */
  email_date: datetime.responseSchema,

  /**
   * A list of all the types the email sent belong to
   */
  email_types: z.array(z.nativeEnum(EmailType)).transform(unique).nullish(),

  /**
   * Details about the user and their requirements
   */
  user: userResponseSchema,

  /**
   * Details of the property which the email was linked to, if applicable
   */
  property: property.responseSchema.nullish(),
});

export const email = {
  responseSchema: emailResponseSchema,
};
