import { z } from "zod";

import { Property } from "../property";
import { requestSchema } from "../request";
import { responseSchema } from "../response";

import {
  PremiumListingDisplayType,
  PremiumListingLettingsStampTextType,
  PremiumListingResaleStampTextType,
} from "./enums";
import { property } from "./property";

export type AddPremiumListingRequest = z.input<
  typeof addPremiumListingRequestSchema
>;
export const addPremiumListingRequestSchema = requestSchema.extend({
  /**
   * Information about the branch loading this property
   */
  branch: z.object({
    /**
     * Unique Rightmove reference for this branch
     */
    branch_id: z.number().int(),

    /**
     * Defines whether this is the sales or lettings channel for a branch
     */
    channel: z.nativeEnum(Property.Channel),
  }),

  /**
   * Information about the property being sent
   */
  property: property.requestSchema.extend({
    /**
     * Information about the property to premium list
     */
    premium_listing: z.object({
      /**
       * The image layout which you would like associated with your premium listed property on Rightmove
       */
      display_type: z.nativeEnum(PremiumListingDisplayType),

      /**
       * The stamp text which you would like displayed for you premium listed resale property on Rightmove (this field is mandatory if the channel provided is Resale)
       */
      resale_stamp_text: z
        .nativeEnum(PremiumListingResaleStampTextType)
        .nullish(),

      /**
       * The stamp text which you would like displayed for you premium listed lettings property on Rightmove (this field is mandatory if the channel provided is Lettings)
       */
      lettings_stamp_text: z
        .nativeEnum(PremiumListingLettingsStampTextType)
        .nullish(),

      /**
       * Is this a web premium listing
       */
      web_flag: z.boolean().optional(),

      /**
       * Is this a mobile premium listing
       */
      mobile_flag: z.boolean().optional(),
    }),
  }),
});

export type AddPremiumListingResponse = z.output<
  typeof addPremiumListingResponseSchema
>;
export const addPremiumListingResponseSchema = responseSchema.extend({
  /**
   * Information about the property sent in the request
   */
  property: property.responseSchema.nullish(),
});
