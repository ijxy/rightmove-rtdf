export enum Channel {
  Sales = 1,
  Lettings = 2,
}

export enum Type {
  NotSpecified = 0,
  TerracedHouse = 1,
  EndOfTerraceHouse = 2,
  SemiDetachedHouse = 3,
  DetachedHouse = 4,
  MewsHouse = 5,
  ClusterHouse = 6,
  GroundFloorFlat = 7,
  Flat = 8,
  StudioFlat = 9,
  GroundFloorMaisonette = 10,
  Maisonette = 11,
  Bungalow = 12,
  TerracedBungalow = 13,
  SemiDetachedBungalow = 14,
  DetachedBungalow = 15,
  MobileHome = 16,
  LandResidential = 20,
  LinkDetachedHouse = 21,
  TownHouse = 22,
  Cottage = 23,
  Chalet = 24,
  House = 26,
  Villa = 27,
  Apartment = 28,
  Penthouse = 29,
  Finca = 30,
  BarnConversion = 43,
  ServicedApartment = 44,
  Parking = 45,
  ShelteredHousing = 46,
  ReteirmentProperty = 47,
  HouseShare = 48,
  FlatShare = 49,
  ParkHome = 50,
  Garages = 51,
  FarmHouse = 52,
  EquestrianFacility = 53,
  Duplex = 56,
  Triplex = 59,
  Longere = 62,
  Gite = 65,
  Barn = 68,
  Trulli = 71,
  Mill = 74,
  Ruins = 77,
  Restaurant = 80,
  Cafe = 83,
  // Mill = 86,
  Castle = 92,
  VillageHouse = 95,
  CaveHouse = 101,
  Cortijo = 104,
  FarmLand = 107,
  Plot = 110,
  CountryHouse = 113,
  StoneHouse = 116,
  Caravan = 117,
  Lodge = 118,
  LogCabin = 119,
  ManorHouse = 120,
  StatelyHome = 121,
  OffPlan = 125,
  SemiDetachedVilla = 128,
  DetachedVilla = 131,
  BarOrNightclub = 134,
  Shop = 137,
  Riad = 140,
  HouseBoat = 141,
  HotelRoom = 142,
  BlockOfApartments = 143,
  PrivateHalls = 144,
  Office = 178,
  BusinessPark = 181,
  ServicedOffice = 184,
  RetailPropertyHighStreet = 187,
  RetailPropertyOutOfTown = 190,
  ConvenienceStore = 193,
  // Garages = 196,
  HairdresserOrBarberShop = 199,
  Hotel = 202,
  PetrolStation = 205,
  PostOffice = 208,
  Pub = 211,
  WorkshopAndRetailSpace = 214,
  DistributionWarehouse = 217,
  Factory = 220,
  HeavyIndustrial = 223,
  IndustrialPark = 226,
  LightIndustrial = 229,
  Storage = 232,
  Showroom = 235,
  Warehouse = 238,
  Land = 241,
  CommercialDevelopment = 244,
  IndustrialDevelopment = 247,
  ResidentialDevelopment = 250,
  CommercialProperty = 253,
  DataCentre = 256,
  Farm = 259,
  HealthcareFacility = 262,
  MarineProperty = 265,
  MixedUse = 268,
  ResearchAndDevelopmentFacility = 271,
  SciencePark = 274,
  GuestHouse = 277,
  Hospitality = 280,
  LeisureFacility = 283,
  HouseOfMultipleOccupation = 512,
  SportsFacilities = 535,
  Spa = 538,
  CampsiteAndHolidayVillage = 541,
  RetailPropertyShoppingCentre = 544,
  RetailPropertyPark = 547,
  RetailPropertyPopUp = 550,
}

export enum Status {
  Available = 1,

  /**
   * Sold, subject to contract. Sales only
   */
  SoldSTC = 2,

  /**
   * Sold, subject to conclusion of missives. Scottish sales only
   */
  SoldSTCM = 3,

  /**
   * Sales only
   */
  UnderOffer = 4,

  /**
   * Sales only
   */
  Reserved = 5,

  /**
   * Lettings only
   */
  LetAgreed = 6,
}

export enum LettingsContractType {
  NotSpecified = 0,
  LongTerm = 1,
  ShortTerm = 2,
  Commercial = 4,
}

export enum PriceQualifier {
  Default = 0,
  POA = 1,
  GuidePrice = 2,
  FixedPrice = 3,
  OffersInExcessOf = 4,
  OIRO = 5,
  SaleByTender = 6,
  From = 7,
  SharedOwnership = 9,
  OffersOver = 10,
  PartBuyPartRent = 11,
  SharedEquity = 12,
  OffersInvited = 15,
  ComingSoon = 16,
}

/**
 * The frequency of rental payments for the property being sent
 */
export enum RentFrequency {
  Yearly = 1,
  Quarterly = 4,
  Monthly = 12,
  Weekly = 52,
  Daily = 365,
}

/**
 * The tenure type for the sale of the property being sent
 */
export enum TenureType {
  Freehold = 1,
  Leasehold = 2,
  Feudal = 3,
  Commonhold = 4,
  ShareOfFreehold = 5,
  NonTraditional = 6,
}

export enum ParkingOption {
  Allocated = 13,
  Communal = 14,
  Covered = 15,
  Garage = 16,
  Driveway = 17,
  Gated = 18,
  OffStreet = 19,
  OnStreet = 20,
  Rear = 21,
  Permit = 22,
  Private = 23,
  Residents = 24,
  NoPermit = 54,
  NotAllocated = 55,
  NoParkingAvailable = 56,
  EVCharging = 57,
  DisabledParkingAvailable = 58,
  NoDisabledParkingAvailable = 59,
  GarageEnBloc = 60,
}

export enum OutsideSpaceType {
  BackGarden = 29,
  CommunalGarden = 30,
  EnclosedGarden = 31,
  FrontGarden = 32,
  PrivateGarden = 33,
  RearGarden = 34,
  Terrace = 35,
  Patio = 36,
}

export enum AreaUnit {
  SquareFeet = 1,
  SqMetres = 2,
  Acres = 3,
  Hectares = 4,
}

export enum EntranceFloor {
  Basement = 1,
  GroundFloor = 2,
  FirstFloor = 3,
  SecondFloor = 4,
  HigherThanSecondFloorWithoutLift = 5,
  HigherThanSecondFloorWithLift = 6,
}

export enum Condition {
  Good = 1,
  SomeWorkNeeded = 2,
  WorkRequiredRhroughout = 3,
  MajorRenovationRequired = 4,
}

export enum AccessibilityMeasure {
  LevelAccess = 37,
  LiftAccess = 38,
  RampedAccess = 39,
  WetRoom = 40,
  WideDoorways = 41,
  NotSuitableForWheelchairUsers = 42,
  StepFreeAccess = 43,
  LevelAccessShower = 44,
  LateralLiving = 45,
}

export enum HeatingType {
  AirConditioning = 1,
  Central = 2,
  DoubleGlazing = 3,
  EcoFriendly = 4,
  Electric = 5,
  Gas = 6,
  GasCentral = 7,
  NightStorage = 8,
  Oil = 9,
  Solar = 10,
  SolarWater = 11,
  UnderFloor = 12,
  WoodBurner = 46,
  OpenFire = 47,
  BiomassBoiler = 48,
  GroundSourceHeatPump = 49,
  AirSourceHeatPump = 50,
  SolarPhotovoltaicThermal = 51,
  UnderfloorHeating = 52,
  SolarThermal = 53,
}

export enum SewerageSupplyType {
  MainsSupply = "mains_supply",
  PrivateSupply = "private_supply",
}

export enum WaterSupplyType {
  MainsSupply = "mains_supply",
  PrivateSupply = "private_supply",
}

export enum ElectricitySupplyType {
  MainsSupply = "mains_supply",
  WindTurbine = "wind_turbine",
  SolarPanels = "solar_pv_panels",
  PrivateSupply = "private_supply",
}

export enum BroadbandType {
  /**
   * Copper wire
   */
  ADSL = "adsl",

  Cable = "cable",

  /**
   * Fibre to cabinet
   */
  FTTC = "fttc",

  /**
   * Fibre to the premises
   */
  FTTP = "fttp",

  None = "none",
}

export enum FurnishedType {
  Furnished = 0,
  PartFurnished = 1,
  Unfurnished = 2,
  FurnishedOrUnfurnished = 4,
}

export enum CommercialUseClass {
  A1Shops = 1,
  A2FinancialAndProfessionalServices = 4,
  A3RestaurantsAndCafes = 7,
  A4DrinkingEstablishments = 10,
  A5HotFoodTakeAway = 13,
  B1Business = 16,
  B2GeneralIndustrial = 19,
  B8StorageAndDistribution = 22,
  C1Hotels = 25,
  C2ResidentialInstitutions = 28,
  C2ASecureResidentialInstitution = 31,
  C3DwellingHouses = 34,
  D1NonResidentialInstitutions = 37,
  D2AssemblyAndLeisure = 40,
  Sui_generis_1 = 43,
  Sui_generis_2 = 46,
}

export enum CouncilTaxBand {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
  TBC = "TBC",
  Deleted = "DELETED",
}

export enum DimensionUnit {
  Metres = 5,
  Centimetres = 6,
  Millimetres = 7,
  Feet = 8,
  Inches = 9,
}

export enum FloodingSource {
  River = "river",
  Sea = "sea",
  Groundwater = "groundwater",
  Lake = "lake",
  Reservoir = "reservoir",
  Other = "other",
}

export enum MediaType {
  Image = 1,
  Floorplan = 2,
  Brochure = 3,
  VirtualTour = 4,
  AudioTour = 5,
  EPC = 6,
  EPCGraph = 7,
}

export enum RemovalReason {
  SoldByUs = 7,
  SoldByAnotherAgent = 8,
  WithdrawnFromMarket = 9,
  LostInstruction = 10,
  Removed = 11,
  LetByUs = 12,
}

export enum ChangeType {
  Create = "CREATE",
  Update = "UPDATE",
  Delete = "DELETE",
}
