import { z } from "zod";

export const requestSchema = z.object({
  /**
   * Information about the network calling the API
   */
  network: z.object({
    /**
     * Unique Rightmove reference for this network
     */
    network_id: z.number().int(),
  }),
});
