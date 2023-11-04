import { APIResponse } from "@/common/types/APIResponse";
import { MarketCap } from "@/common/types/mutual_funds/mutualFunds";

export default async function getAllMarketCaps(
  access_token: string,
  slug: string,
  page: number = 1,
  page_size: number = 20,
): Promise<APIResponse<MarketCap>> {
  try {
    let url = `${process.env.NEXT_PRIVATE_API_URL}/mutual-funds/fund/${slug}/market-caps/?page_size=${page_size}`;

    if (page) {
      url += `&page=${page}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    return res.json();
  } catch (error) {
    throw error;
  }
}
