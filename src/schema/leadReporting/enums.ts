export enum EmailType {
  RequestViewing = 1,
  RequestAppraisal = 2,
  RequestPropertyDetails = 3,
  AgentValuationRequest = 4,
  EmailToAgent = 6,
  MultiAgentEmail = 34,
  LVALead = 46,
  DiscoverValuation = 47,
  OpportunityManagerValuation = 50,
}

export enum UserPropertyToRentStatus {
  /**
   * No, I don't
   */
  No = 1,

  /**
   * Not yet, I intend to buy to let
   */
  NoBuyToLet = 2,

  /**
   * Yes, it is available to let now
   */
  YesAvailableNow = 3,

  /**
   * Yes, it will be available to let soon
   */
  YesAvailableSoon = 4,

  /**
   * Yes, it is currently occupied
   */
  YesCurrentlyOccupied = 5,

  /**
   * Yes, I do
   */
  Yes = 6,
}

export enum UserPropertyToSellStatus {
  /**
   * No, I don't
   */
  No = 1,

  /**
   * Yes, it is not on the market yet
   */
  YesNotOnTheMarket = 2,

  /**
   * Yes, it is on the market already
   */
  YesOnTheMarket = 3,

  /**
   * Yes, it is under offer
   */
  YesUnderOffer = 4,

  /**
   * Yes, it is already exchanged
   */
  YesAlreadyExchanged = 5,

  /**
   * Yes, I do
   */
  Yes = 6,
}

export enum UserMoveDate {
  AsSoonAsPossible = 1,
  January = 2,
  February = 3,
  March = 4,
  April = 5,
  May = 6,
  June = 7,
  July = 8,
  August = 9,
  September = 10,
  October = 11,
  November = 12,
  December = 13,
}
