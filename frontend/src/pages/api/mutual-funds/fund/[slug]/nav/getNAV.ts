import { APIResponse } from "@/common/types/APIResponse";
import { NAV } from "@/common/types/mutual_funds/mutualFunds";

export default async function getNAV(
  access_token: string,
  slug: string,
  page: number = 1,
  page_size: number = 20,
): Promise<APIResponse<NAV>> {
  try {
    let url = `${process.env.NEXT_PRIVATE_API_URL}/mutual-funds/fund/${slug}/nav/?page_size=${page_size}`;

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
