import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        const { email, password, confirmPassword } = req.body;

        if (!email || !password || !confirmPassword) {
          return res.status(400).end("Invalid Data Format!");
        }

        const url = `${process.env.NEXT_PRIVATE_API_URL}/auth/registration/`;

        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password1: password,
            password2: confirmPassword,
          }),
        })
          .then(async (resp) => {
            return await resp.json();
          })
          .then(async (data) => {
            const resp = await data;

            if (resp.access && resp.refresh) {
              return res.status(201).json(resp);
            } else if (resp.non_field_errors?.length > 0 || resp.email || resp.username) {
              return res.status(400).json(resp);
            }

            return res.status(500).json(resp);
          });

        return res.status(400).end();
      } catch (error) {
        console.log(error);
        return res.status(500).end("Internal Server Error");
      }
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
