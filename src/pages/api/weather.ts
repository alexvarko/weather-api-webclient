import type { NextApiRequest, NextApiResponse } from "next";
import { WeatherData } from "#/types";

interface ErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData | ErrorResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { city } = req.query;

  if (!city || Array.isArray(city)) {
    return res
      .status(400)
      .json({ message: "City parameter is required and must be a string" });
  }

  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      throw new Error("BACKEND_URL environment variable is not defined");
    }
    const response = await fetch(
      `${process.env.BACKEND_URL}/weather?city=${encodeURIComponent(city)}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: data || "Error fetching weather data" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
