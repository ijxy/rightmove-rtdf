import { RequestOptions, request } from "./request";
import * as schema from "./schema";

const LIVE_ENDPOINT = "https://adfapi.rightmove.co.uk/";
const TEST_ENDPOINT = "https://adfapi.adftest.rightmove.com/";

export type DefaultRequestOptions = Partial<Pick<RequestOptions, "agent">>;

export type ClientOptions = {
  test?: boolean;
  requestOptions?: DefaultRequestOptions;
};

export class Client {
  readonly endpoint: string;
  readonly defaultRequestOptions?: DefaultRequestOptions;

  constructor(options?: ClientOptions) {
    this.endpoint = options?.test ? TEST_ENDPOINT : LIVE_ENDPOINT;
    this.defaultRequestOptions = options?.requestOptions;
  }

  private toURL(path: `/v1/property/${string}`): URL {
    return new URL(path, this.endpoint);
  }

  private withDefaultRequestOptions(options?: RequestOptions): RequestOptions {
    return {
      agent: options?.agent ?? this.defaultRequestOptions?.agent,
      signal: options?.signal,
    };
  }

  /**
   * `GetBranchEmails` is used to get regular exports of email leads for a specific UK branch.
   */
  async getBranchEmails(
    input: schema.GetBranchEmailsRequest,
    options?: RequestOptions,
  ): Promise<schema.GetBranchEmailsResponse> {
    const output = await request(
      this.toURL("/v1/property/getbranchemails"),
      schema.getBranchEmailsRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.getBranchEmailsResponseSchema.parse(output);
  }

  /**
   * `GetBrandEmails` is used to get regular exports of email leads for a specific UK brand.
   */
  async getBrandEmails(
    input: schema.GetBrandEmailsRequest,
    options?: RequestOptions,
  ): Promise<schema.GetBrandEmailsResponse> {
    const output = await request(
      this.toURL("/v1/property/getbrandemails"),
      schema.getBrandEmailsRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.getBrandEmailsResponseSchema.parse(output);
  }

  /**
   * `GetPropertyEmails` is used to get regular exports of email leads for a specific UK property. Within each email lead, the
   * user’s contact details and current position in terms of buying/letting will be provided.
   */
  async getPropertyEmails(
    input: schema.GetPropertyEmailsRequest,
    options?: RequestOptions,
  ): Promise<schema.GetPropertyEmailsResponse> {
    const output = await request(
      this.toURL("/v1/property/getpropertyemails"),
      schema.getPropertyEmailsRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.getPropertyEmailsResponseSchema.parse(output);
  }

  /**
   * `GetBranchPerformance` reports on all of a branch’s properties for a given date and is designed to be used daily by feed
   * providers who wish to build up a local database of property performance on Rightmove.
   */
  async getBranchPerformance(
    input: schema.GetBranchPerformanceRequest,
    options?: RequestOptions,
  ): Promise<schema.GetBranchPerformanceResponse> {
    const output = await request(
      this.toURL("/v1/property/getbranchperformance"),
      schema.getBranchPerformanceRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.getBranchPerformanceResponseSchema.parse(output);
  }

  /**
   * `GetPropertyPerformance` reports on the performance of an individual property over a range of dates and is designed to
   * be used on an ad-hoc basis, as and when users request performance data for a particular property.
   */
  async getPropertyPerformance(
    input: schema.GetPropertyPerformanceRequest,
    options?: RequestOptions,
  ): Promise<schema.GetPropertyPerformanceResponse> {
    const output = await request(
      this.toURL("/v1/property/getpropertyperformance"),
      schema.getPropertyPerformanceRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.getPropertyPerformanceResponseSchema.parse(output);
  }

  /**
   * `AddFeaturedProperty` is used to add and update the Featured Property product and the Featured Property of the Week
   * product.
   */
  async addFeaturedProperty(
    input: schema.AddFeaturedPropertyRequest,
    options?: RequestOptions,
  ): Promise<schema.AddFeaturedPropertyResponse> {
    const output = await request(
      this.toURL("/v1/property/addfeaturedproperty"),
      schema.addFeaturedPropertyRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.addFeaturedPropertyResponseSchema.parse(output);
  }

  /**
   * `RemoveFeaturedProperty` is used to removes the Featured Property product. Once the Featured Property of the Week
   * product has been applied to a property or the branch has automatic rotation set up for the Featured Property product, it cannot
   * be removed and will produce an error message to explain which.
   */
  async removeFeaturedProperty(
    input: schema.RemoveFeaturedPropertyRequest,
    options?: RequestOptions,
  ): Promise<schema.RemoveFeaturedPropertyResponse> {
    const output = await request(
      this.toURL("/v1/property/removefeaturedproperty"),
      schema.removeFeaturedPropertyRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.removeFeaturedPropertyResponseSchema.parse(output);
  }

  /**
   * `AddPremiumListing` is used to add and update the Premium Listing product on UK properties.
   *
   * When applying a new Premium Listing, the logic in the data feed will perform a check to make sure that the branch has credits
   * available for the product which is being applied (web or mobile Premium Listing) before applying the product. If there are not
   * sufficient credits available, the request will fail and the error message will state that there were not sufficient credits available.
   *
   * IMPORTANT: Rightmove use the `agent_ref` field to identify if the Premium Listing product is being applied to a property for the
   * first time or to update the existing Premium Listing product. To update an existing Premium Listing product, you should provide
   * the same `agent_ref` as provided previously for that property.
   */
  async addPremiumListing(
    input: schema.AddPremiumListingRequest,
    options?: RequestOptions,
  ): Promise<schema.AddPremiumListingResponse> {
    const output = await request(
      this.toURL("/v1/property/addpremiumlisting"),
      schema.addPremiumListingRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.addPremiumListingResponseSchema.parse(output);
  }

  /**
   * `GetBranchPropertyList` will give you a snapshot of a branch’s properties which can then be used to check properties have
   * been created as expected, properties which are present are up-to-date, or to check that there aren’t any properties still live on
   * Rightmove which should have been removed.
   */
  async getBranchPropertyList(
    input: schema.GetBranchPropertyListRequest,
    options?: RequestOptions,
  ): Promise<schema.GetBranchPropertyListResponse> {
    const output = await request(
      this.toURL("/v1/property/getbranchpropertylist"),
      schema.getBranchPropertyListRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.getBranchPropertyListResponseSchema.parse(output);
  }

  /**
   * `SendPropertyDetails` is used to add and update UK properties.
   *
   * IMPORTANT: Rightmove use the `agent_ref` field to identify if the property is a new listing. To update an existing listing, you
   * should provide the same `agent_ref`.
   */
  async sendPropertyDetails(
    input: schema.SendPropertyDetailsRequest,
    options?: RequestOptions,
  ): Promise<schema.SendPropertyDetailsResponse> {
    const output = await request(
      this.toURL("/v1/property/sendpropertydetails"),
      schema.sendPropertyDetailsRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.sendPropertyDetailsResponseSchema.parse(output);
  }

  /**
   * `RemoveProperty` is used to remove both UK properties. Rightmove will archive any property which is
   * successfully removed using `RemoveProperty`. When a property is successfully removed via a `RemoveProperty`
   * request, the property will be moved to the agent’s archived properties list. If the property is a UK property, it will still be visible
   * on areas of Rightmove where archived properties are typically visible (these include the Sold Prices area of the website and the
   * Best Price Guide).
   */
  async removeProperty(
    input: schema.RemovePropertyRequest,
    options?: RequestOptions,
  ): Promise<schema.RemovePropertyResponse> {
    const output = await request(
      this.toURL("/v1/property/removeproperty"),
      schema.removePropertyRequestSchema.parse(input),
      this.withDefaultRequestOptions(options),
    );
    return schema.removePropertyResponseSchema.parse(output);
  }
}
