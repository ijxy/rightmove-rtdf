import { z } from "zod";

import { datetime } from "../datetime";
import { requestSchema } from "../request";
import { responseSchema } from "../response";
import { unique } from "../utils";

import {
  AccessibilityMeasure,
  AreaUnit,
  BroadbandType,
  Channel,
  CommercialUseClass,
  Condition,
  CouncilTaxBand,
  DimensionUnit,
  ElectricitySupplyType,
  EntranceFloor,
  FloodingSource,
  FurnishedType,
  HeatingType,
  LettingsContractType,
  MediaType,
  OutsideSpaceType,
  ParkingOption,
  PriceQualifier,
  RentFrequency,
  SewerageSupplyType,
  Status,
  TenureType,
  Type,
  WaterSupplyType,
} from "./enums";
import { property } from "./property";

const addressRequestSchema = z.object({
  /**
   * The first line of the address including the property name or number
   */
  house_name_number: z.string().min(1).max(60),

  /**
   * The second line of the address for this property
   */
  address_2: z.string().max(60).nullish(),

  /**
   * The third line of the address for this property
   */
  address_3: z.string().max(60).nullish(),

  /**
   * The fourth line of the address for this property
   */
  address_4: z.string().max(60).nullish(),

  /**
   * The town in which the property is located
   */
  town: z.string().min(1).max(60),

  /**
   * The first half of the post code for the property being sent
   */
  postcode_1: z.string().min(1).max(4),

  /**
   * The second half of the post code for the property being sent
   */
  postcode_2: z.string().min(1).max(3),

  /**
   * The address which should be displayed for the property being sent
   */
  display_address: z.string().min(1).max(120),

  /**
   * The exact latitude of the property
   */
  latitude: z.number().min(-90).max(90).nullish(),

  /**
   * The exact longitude of the property
   */
  longitude: z.number().min(-180).max(180).nullish(),

  /**
   * The latitude for the google streetview camera
   */
  pov_latitude: z.number().min(-90).max(90).nullish(),

  /**
   * The longitude for the google streetview camera
   */
  pov_longitude: z.number().min(-180).max(180).nullish(),

  /**
   * The pitch for the google streetview camera
   */
  pov_pitch: z.number().min(-180).max(180).nullish(),

  /**
   * The heading for the google streetview camera
   */
  pov_heading: z.number().min(-360).max(360).nullish(),

  /**
   * The zoom level for the google streetview camera
   */
  pov_zoom: z.number().int().nullish(),
});

const priceInformationRequestSchema = z.object({
  /**
   * The price of the property being sent
   */
  price: z.number().min(1),

  /**
   * The qualifier on the advertised price of the property being sent
   */
  price_qualifier: z.nativeEnum(PriceQualifier).nullish(),

  /**
   * The deposit required for rental of the property being sent
   */
  deposit: z.number().min(0).nullish(),

  /**
   * The admin fee required for the rental contract of the property being sent
   */
  administration_fee: z.string().max(4000).nullish(),

  /**
   * The frequency of rental payments for the property being sent
   */
  rent_frequency: z.nativeEnum(RentFrequency).nullish(),

  /**
   * The tenure type for the sale of the property being sent
   */
  tenure_type: z.nativeEnum(TenureType).nullish(),

  /**
   * Indicates if this property is being sold at auction
   */
  auction: z.boolean().nullish(),

  /**
   * The number of years left on the tenure of this property
   */
  tenure_unexpired_years: z.number().min(0).nullish(),

  /**
   * The price per unit area of the property being sent
   */
  price_per_unit_area: z.number().min(0).nullish(),

  /**
   * The price per unit area per annum of the commercial property being sent
   */
  price_per_unit_per_annum: z.number().min(0).nullish(),

  /**
   * Whether the property listing is shared ownership
   */
  shared_ownership: z.boolean().nullish(),

  /**
   * The percentage share being sold
   */
  shared_ownership_percentage: z.number().min(1).max(99).nullish(),

  /**
   * Price of rent due for the unowned percentage of property
   */
  shared_ownership_rent: z.number().min(0).nullish(),

  /**
   * The frequency of rental payments for the unowned percentage of property being sent
   */
  shared_ownership_rent_frequency: z.nativeEnum(RentFrequency).nullish(),

  /**
   * The annual cost for ground rent for the property (for resale leasehold properties)
   */
  annual_ground_rent: z.number().min(0).nullish(),

  /**
   * The review period for ground rent for the property in years (for resale leasehold properties)
   */
  ground_rent_review_period_years: z.number().min(0).nullish(),

  /**
   * Ground rent increase amount as a percentage (for resale leasehold properties)
   */
  ground_rent_percentage_increase: z.number().min(0).nullish(),

  /**
   * The annual service charge for the property
   */
  annual_service_charge: z.number().min(0).nullish(),
});

const detailsRequestSchema = z.object({
  /**
   * The summary description of the property being sent
   */
  summary: z.string().min(1).max(1000),

  /**
   * The full description of the property being sent
   */
  description: z.string().min(1).max(32000),

  /**
   * Features of the property being sent
   */
  features: z
    .array(z.string().min(1).max(200))
    .max(10)
    .transform(unique)
    .nullish(),

  /**
   * The number of bedrooms for the property being sent
   */
  bedrooms: z.number().int().min(0),

  /**
   * The number of bathrooms for the property being sent
   */
  bathrooms: z.number().int().min(0).nullish(),

  /**
   * The number of reception rooms for the property being sent
   */
  reception_rooms: z.number().int().min(0).nullish(),

  /**
   * Parking options available for the property being sent
   */
  parking: z.array(z.nativeEnum(ParkingOption)).transform(unique).nullish(),

  /**
   * Outside spaces associated with the property being sent
   */
  outside_space: z
    .array(z.nativeEnum(OutsideSpaceType))
    .transform(unique)
    .nullish(),

  /**
   * The year in which the property being sent was built
   */
  year_built: z.number().int().min(0).nullish(),

  /**
   * Total internal area of the property being sent
   */
  internal_area: z.number().int().nullish(),

  /**
   * Units which the internal area is sent in
   */
  internal_area_unit: z.nativeEnum(AreaUnit).nullish(),

  /**
   * Total land area of the property being sent
   */
  land_area: z.number().int().nullish(),

  /**
   * Units which the land area is sent in
   */
  land_area_unit: z.nativeEnum(AreaUnit).nullish(),

  /**
   * The size details about the property being be sent
   */
  sizing: z
    .object({
      /**
       * The minimum size of the property being sent
       */
      minimum: z.number().min(0).nullish(),

      /**
       * The maximum size of the property being sent
       */
      maximum: z.number().min(0).nullish(),

      /**
       * Units which the property size is sent in
       */
      area_unit: z.nativeEnum(AreaUnit).nullish(),
    })
    .nullish(),

  /**
   * Number of floors in the property being sent
   */
  floors: z.number().int().min(0).nullish(),

  /**
   * Floor which the entrance to the property being sent is on
   */
  entrance_floor: z.nativeEnum(EntranceFloor).nullish(),

  /**
   * Condition of the property being sent
   */
  condition: z.nativeEnum(Condition).nullish(),

  /**
   * Accessibility measures in place in the property being sent
   */
  accessibility: z
    .array(z.nativeEnum(AccessibilityMeasure))
    .transform(unique)
    .nullish(),

  /**
   * Heating related features of the property being sent
   */
  heating: z.array(z.nativeEnum(HeatingType)).transform(unique).nullish(),

  /**
   * Primary sewerage arrangements at the property
   */
  sewerage: z.nativeEnum(SewerageSupplyType).nullish(),

  /**
   * Primary supply of water to the property
   */
  water: z.nativeEnum(WaterSupplyType).nullish(),

  /**
   * Primary supply of electricity to the property
   */
  electricity: z
    .array(z.nativeEnum(ElectricitySupplyType))
    .transform(unique)
    .nullish(),

  /**
   * Current supply of broadband to the property
   */
  broadband: z.array(z.nativeEnum(BroadbandType)).transform(unique).nullish(),

  /**
   * Is furnishing included in the rental of the property being sent
   */
  furnished_type: z.nativeEnum(FurnishedType).nullish(),

  /**
   * Are pets permitted in the property being sent
   */
  pets_allowed: z.boolean().nullish(),

  /**
   * Are smokers considered for the property being sent
   */
  smokers_considered: z.boolean().nullish(),

  /**
   * Are sharers considered for the property being sent
   */
  sharers_considered: z.boolean().nullish(),

  /**
   * Is there a burglar alarm in the property being sent
   */
  burglar_alarm: z.boolean().nullish(),

  /**
   * Is there a washing machine in the property being sent
   */
  washing_machine: z.boolean().nullish(),

  /**
   * Is there a dishwasher in the property being sent
   */
  dishwasher: z.boolean().nullish(),

  /**
   * Are bills included in the rental price of the property being sent
   */
  all_bills_inc: z.boolean().nullish(),

  /**
   * Is the water bill included in the rental price of the property being sent
   */
  water_bill_inc: z.boolean().nullish(),

  /**
   * Is the gas bill included in the rental price of the property being sent
   */
  gas_bill_inc: z.boolean().nullish(),

  /**
   * Is the electricity bill included in the rental price of the property being sent
   */
  electricity_bill_inc: z.boolean().nullish(),

  /**
   * Is the oil bill included in the rental price of the property being sent
   */
  oil_bill_inc: z.boolean().nullish(),

  /**
   * Is council tax included in the rental price of the property being sent
   */
  council_tax_inc: z.boolean().nullish(),

  /**
   * Is the property listing exempt from council tax
   */
  council_tax_exempt: z.boolean().nullish(),

  /**
   * Is the tv licence included in the rental price of the property being sent
   */
  tv_licence_inc: z.boolean().nullish(),

  /**
   * Is satellite or cable TV included in the rental price of the property being sent
   */
  sat_cable_tv_bill_inc: z.boolean().nullish(),

  /**
   * Is the internet bill included in the rental price of the property being sent
   */
  internet_bill_inc: z.boolean().nullish(),

  /**
   * Is there a business for sale with the commercial property being sent
   */
  business_for_sale: z.boolean().nullish(),

  /**
   * The commercial use class(es) of the property being sent
   */
  comm_use_class: z
    .array(z.nativeEnum(CommercialUseClass))
    .max(6)
    .transform(unique)
    .nullish(),

  /**
   * The council tax band of the property
   */
  council_tax_band: z.nativeEnum(CouncilTaxBand).nullish(),

  /**
   * Annual total rates for the property (Northern Ireland only)
   */
  domestic_rates: z.number().min(0).nullish(),

  /**
   * Room data for the property being sent
   */
  rooms: z
    .array(
      z.object({
        /**
         * The name of the room
         */
        room_name: z.string().min(1).max(120),

        /**
         * The specific description of that room
         */
        room_description: z.string().max(1000).nullish(),

        /**
         * The length of the room
         */
        room_length: z.number().nullish(),

        /**
         * The width of the room
         */
        room_width: z.number().nullish(),

        /**
         * The units which the length and width of the room have been provided in
         */
        room_dimension_unit: z.nativeEnum(DimensionUnit).nullish(),

        /**
         * The URLs of images which should be associated with this room
         */
        room_photo_urls: z
          .array(z.string().url().max(250))
          .max(10)
          .transform(unique)
          .nullish(),
      }),
    )
    .max(99)
    .nullish(),

  /**
   * Information about risks for the property
   */
  risks: z.object({
    /**
     * Has property been flooded in last 5 years
     */
    flooded_in_last_five_years: z.boolean().nullish(),

    /**
     * Types of flooding sources affecting the property
     */
    sources_of_flooding: z
      .array(z.nativeEnum(FloodingSource))
      .transform(unique)
      .nullish(),

    /**
     * Any flood defences at the property
     */
    flood_defences: z.boolean().nullish(),
  }),

  /**
   * Any statutory or contractual provisions which restrict or require the use of land or restrictions on resale, or which require it to be used, preserved or maintained in a specified manner
   */
  obligations: z.object({
    /**
     * Is the property listed
     */
    listed: z.boolean().nullish(),

    /**
     * Are there any restrictions associated with the property
     */
    restrictions: z.boolean().nullish(),

    /**
     * Any easements, servitudes, or wayleaves
     */
    required_access: z.boolean().nullish(),

    /**
     * The existence of any public or private right of way
     */
    rights_of_way: z.boolean().nullish(),
  }),
});

const mediaItemRequestSchema = z.object({
  /**
   * The type of media which is being sent
   */
  media_type: z.nativeEnum(MediaType),

  /**
   * The URL to retrieve this piece of media from
   */
  media_url: z.string().url().min(1).max(250),

  /**
   * The caption to be displayed for this piece of media
   */
  caption: z.string().max(50).nullish(),

  /**
   * The display order for this piece of media
   */
  sort_order: z.number().int().min(0).nullish(),

  /**
   * The date the media at this URL was last updated
   */
  media_update_date: datetime.requestSchema.nullish(),
});

export type SendPropertyDetailsRequest = z.input<
  typeof sendPropertyDetailsRequestSchema
>;
export const sendPropertyDetailsRequestSchema = requestSchema.extend({
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
    channel: z.nativeEnum(Channel),

    /**
     * Flag to identify whether a property is UK or Overseas
     */
    overseas: z.boolean().nullish(),
  }),

  /**
   * Information about the property being sent
   */
  property: property.requestSchema.extend({
    /**
     * Defines whether this property should be visible on Rightmove
     */
    published: z.boolean(),

    /**
     * The type of the property being sent in this message
     */
    property_type: z.nativeEnum(Type),

    /**
     * The current transaction status for this property
     */
    status: z.nativeEnum(Status),

    /**
     * Defines whether this property is a new build
     */
    new_home: z.boolean().nullish(),

    /**
     * Defines whether this property is available for student lettings
     */
    student_property: z.boolean().nullish(),

    /**
     * Defines whether this advert is for a house/flat share
     */
    house_flat_share: z.boolean().nullish(),

    /**
     * Date this property was created
     */
    create_date: datetime.requestSchema.nullish(),

    /**
     * Date this property was last updated in the feed provider's software
     */
    update_date: datetime.requestSchema.nullish(),

    /**
     * Date a rental property is available
     */
    date_available: datetime.requestSchema.nullish(),

    /**
     * Length of rental contract in months
     */
    contract_months: z.number().int().min(0).nullish(),

    /**
     * Minimum term for the rental contract in months
     */
    minimum_term: z.number().int().min(0).nullish(),

    /**
     * The type of rental contract available for this property
     */
    let_type: z.nativeEnum(LettingsContractType).nullish(),

    /**
     * Information about the address of the property being sent
     */
    address: addressRequestSchema,

    /**
     * Information about the price of the property being sent
     */
    price_information: priceInformationRequestSchema,

    /**
     * The details about the property being sent
     */
    details: detailsRequestSchema,

    /**
     * The media for the property being sent
     */
    media: z.array(mediaItemRequestSchema).max(999).nullish(),
  }),
});

export type SendPropertyDetailsResponse = z.output<
  typeof sendPropertyDetailsResponseSchema
>;
export const sendPropertyDetailsResponseSchema = responseSchema.extend({
  /**
   * Information about the property sent in the request
   */
  property: property.responseSchema.nullish(),
});
