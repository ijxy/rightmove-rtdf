import assert from "node:assert";
import https from "node:https";
import test from "node:test";

import { DateTime } from "luxon";

import { Client, Product, Property } from "../src";

const AGENT_REF = "abc123";

const NETWORK_ID = Number.parseInt(process.env.NETWORK_ID ?? "");
const BRANCH_ID = Number.parseInt(process.env.BRANCH_ID ?? "");
const BRAND_ID = Number.parseInt(process.env.BRAND_ID ?? "");
const CERT_PEM = Buffer.from(process.env.CERT_PEM_BASE64 ?? "", "base64");
const CERT_PASSPHRASE = process.env.CERT_PASSPHRASE;

const SKIP = !NETWORK_ID || !CERT_PEM || !CERT_PASSPHRASE;

const SKIP_PROPERTY = false;
const SKIP_PRODUCT = true;
const SKIP_LEAD_REPORTING = false;
const SKIP_PERFORMANCE_REPORTING = true;

test("RTDF Integration", { skip: SKIP }, async (t) => {
  const agent = new https.Agent({
    cert: CERT_PEM,
    key: CERT_PEM,
    passphrase: CERT_PASSPHRASE,
  });

  const client = new Client({ test: true, requestOptions: { agent } });

  await t.test("Property Calls", { skip: SKIP_PROPERTY }, async (tt) => {
    await tt.test("getBranchPropertyList", { skip: !BRANCH_ID }, async () => {
      const response = await client.getBranchPropertyList({
        network: {
          network_id: NETWORK_ID,
        },
        branch: {
          branch_id: BRANCH_ID,
        },
      });
      assert(response.success, JSON.stringify(response.errors, null, 2));
    });

    await tt.test("sendPropertyDetails", { skip: !BRANCH_ID }, async () => {
      const response = await client.sendPropertyDetails({
        network: {
          network_id: NETWORK_ID,
        },
        branch: {
          branch_id: BRANCH_ID,
          channel: Property.Channel.Lettings,
        },
        property: {
          agent_ref: AGENT_REF,
          address: {
            display_address: "Buckingham Palace",
            house_name_number: "Buckingham Palace",
            town: "London",
            postcode_1: "SW1A",
            postcode_2: "1AA",
          },
          details: {
            summary:
              "Buckingham Palace is a royal residence in London and the administrative headquarters of the monarch of the United Kingdom. Located in the City of Westminster, the palace is often at the centre of state occasions and royal hospitality.",
            description:
              "Buckingham Palace is a royal residence in London and the administrative headquarters of the monarch of the United Kingdom. Located in the City of Westminster, the palace is often at the centre of state occasions and royal hospitality.",
            obligations: {
              listed: true,
              restrictions: true,
              rights_of_way: true,
            },
            risks: {
              flooded_in_last_five_years: false,
              flood_defences: false,
              sources_of_flooding: [Property.FloodingSource.River],
            },
            bedrooms: 240,
            bathrooms: 78,
            reception_rooms: 19,
            furnished_type: Property.FurnishedType.Furnished,
            year_built: 1705,
          },
          price_information: {
            price: 1000_00,
          },
          property_type: Property.Type.Flat,
          published: true,
          status: Property.Status.Available,
        },
      });
      assert(response.success, JSON.stringify(response.errors, null, 2));
    });

    await tt.test("removeProperty", { skip: !BRANCH_ID }, async () => {
      const response = await client.removeProperty({
        network: {
          network_id: NETWORK_ID,
        },
        branch: {
          branch_id: BRANCH_ID,
          channel: Property.Channel.Lettings,
        },
        property: {
          agent_ref: AGENT_REF,
        },
      });
      assert(response.success, JSON.stringify(response.errors, null, 2));
    });
  });

  await t.test("Product Calls", { skip: SKIP_PRODUCT }, async (tt) => {
    await tt.test("addFeaturedProperty", { skip: !BRANCH_ID }, async () => {
      const response = await client.addFeaturedProperty({
        network: {
          network_id: NETWORK_ID,
        },
        branch: {
          branch_id: BRANCH_ID,
          channel: Property.Channel.Lettings,
        },
        property: {
          agent_ref: AGENT_REF,
          featured_property: {
            featured_property_type:
              Product.FeaturedPropertyType.FeaturedPropertyOfTheWeek,
          },
        },
      });
      assert(response.success, JSON.stringify(response.errors, null, 2));
    });

    await tt.test("removeFeaturedProperty", { skip: !BRANCH_ID }, async () => {
      const response = await client.removeFeaturedProperty({
        network: {
          network_id: NETWORK_ID,
        },
        branch: {
          branch_id: BRANCH_ID,
          channel: Property.Channel.Lettings,
        },
        property: {
          agent_ref: AGENT_REF,
        },
      });
      assert(response.success, JSON.stringify(response.errors, null, 2));
    });

    await tt.test("addPremiumListing", { skip: !BRANCH_ID }, async () => {
      const response = await client.addPremiumListing({
        network: {
          network_id: NETWORK_ID,
        },
        branch: {
          branch_id: BRANCH_ID,
          channel: Property.Channel.Lettings,
        },
        property: {
          agent_ref: AGENT_REF,
          premium_listing: {
            display_type: Product.PremiumListingDisplayType.OneLargeImage,
            web_flag: true,
            mobile_flag: true,
          },
        },
      });
      assert(response.success, JSON.stringify(response.errors, null, 2));
    });
  });

  await t.test(
    "Lead Reporting Calls",
    { skip: SKIP_LEAD_REPORTING },
    async (tt) => {
      await tt.test("getBrandEmails", { skip: !BRAND_ID }, async () => {
        const response = await client.getBrandEmails({
          network: {
            network_id: NETWORK_ID,
          },
          brand: {
            brand_id: BRAND_ID,
          },
          export_period: {
            start_date_time: DateTime.now().minus({ day: 7 }).toJSDate(),
            end_date_time: DateTime.now().toJSDate(),
          },
        });
        assert(response.success, JSON.stringify(response.errors, null, 2));
      });

      await tt.test("getBranchEmails", { skip: !BRANCH_ID }, async () => {
        const response = await client.getBranchEmails({
          network: {
            network_id: NETWORK_ID,
          },
          branch: {
            branch_id: BRANCH_ID,
          },
          export_period: {
            start_date_time: DateTime.now().minus({ day: 7 }).toJSDate(),
            end_date_time: DateTime.now().toJSDate(),
          },
        });
        assert(response.success, JSON.stringify(response.errors, null, 2));
      });

      await tt.test("getPropertyEmails", async () => {
        const response = await client.getPropertyEmails({
          network: {
            network_id: NETWORK_ID,
          },
          branch: {
            branch_id: BRANCH_ID,
          },
          property: {
            agent_ref: AGENT_REF,
          },
          export_period: {
            start_date_time: DateTime.now().minus({ day: 7 }).toJSDate(),
            end_date_time: DateTime.now().toJSDate(),
          },
        });
        assert(response.success, JSON.stringify(response.errors, null, 2));
      });
    },
  );

  await t.test(
    "Performance Reporting Calls",
    { skip: SKIP_PERFORMANCE_REPORTING },
    async (tt) => {
      await tt.test("getBranchPerformance", { skip: !BRANCH_ID }, async () => {
        const response = await client.getBranchPerformance({
          network: {
            network_id: NETWORK_ID,
          },
          branch: {
            branch_id: BRANCH_ID,
          },
          export_date: DateTime.now().minus({ day: 7 }).toJSDate(),
        });
        assert(response.success, JSON.stringify(response.errors, null, 2));
      });

      await tt.test(
        "getPropertyPerformance",
        { skip: !BRANCH_ID },
        async () => {
          const response = await client.getPropertyPerformance({
            network: {
              network_id: NETWORK_ID,
            },
            branch: {
              branch_id: BRANCH_ID,
            },
            property: {
              agent_ref: AGENT_REF,
            },
            export_period: {
              start_date: DateTime.now().minus({ day: 7 }).toJSDate(),
              end_date: DateTime.now().minus({ day: 1 }).toJSDate(),
            },
          });
          assert(response.success, JSON.stringify(response.errors, null, 2));
        },
      );
    },
  );
});
