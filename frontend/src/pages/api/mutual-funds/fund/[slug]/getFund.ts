import { Fund } from "@/common/types/mutual_funds/mutualFunds";

export default async function getFund(access_token: string, slug: string): Promise<Fund> {
  try {
    const url = `${process.env.NEXT_PRIVATE_API_URL}/mutual-funds/fund/${slug}/`;

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
