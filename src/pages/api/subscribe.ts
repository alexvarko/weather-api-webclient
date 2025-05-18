import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error("BACKEND_URL environment variable is not defined");
    }
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const response = await fetch(`${backendUrl}/subscribe`, {
      method: "POST",
      headers,
      body: req.body,
    });

    const data = await response.text();

    return res.status(response.status).send(data);
  } catch (error) {
    console.error("Error subscribing:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
