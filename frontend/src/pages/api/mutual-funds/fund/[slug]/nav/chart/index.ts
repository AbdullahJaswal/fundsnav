import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session: Session | null = await getServerSession(req, res, authOptions);
  const { slug } = req.query;

  if (!session || !slug) {
    res.status(401).end();
  }

  switch (req.method) {
    case "GET":
      try {
        const { interval, high_precision } = req.query;

        if (!interval) {
          return res.status(401).end();
        }

        const url = `${process.env.NEXT_PRIVATE_API_URL}/mutual-funds/fund/${slug}/nav/chart/?interval=${interval}&high_precision=${high_precision}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${session?.access}`,
            "Content-Type": "application/json",
          },
        });

        const res_json = await response.json();

        return res.status(response.status).json(res_json);
      } catch (error) {
        return res.status(500).end("Internal Server Error");
      }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
