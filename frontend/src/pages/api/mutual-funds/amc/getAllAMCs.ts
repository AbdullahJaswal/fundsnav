import { APIResponse } from "@/common/types/APIResponse";
import { AMC } from "@/common/types/mutual_funds/mutualFunds";

export default async function getAllAMCs(
  access_token: string,
  search: string = "",
  page: number = 1,
  page_size: number = 20,
): Promise<APIResponse<AMC>> {
  try {
    let url = `${process.env.NEXT_PRIVATE_API_URL}/mutual-funds/amc/?page_size=${page_size}`;

    if (search) {
      url += `&search=${search}`;
    }

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
