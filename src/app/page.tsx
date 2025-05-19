"use client";
import { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import WeatherDisplay from "../components/WeatherDisplay";
import SubscriptionForm from "#/components/SubscriptionForm";
import { WeatherData } from "#/types";

const Home: NextPage = () => {
  const [city, setCity] = useState<string>("");
  const [submittedCity, setSubmittedCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showSubscribe, setShowSubscribe] = useState<boolean>(false);

  const handleCitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeatherData(null);
    setShowSubscribe(false);
    setSubmittedCity(city);

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather data");
      }

      setWeatherData(data);
      setShowSubscribe(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error fetching weather data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Weather Subscription App</title>
        <meta
          name="description"
          content="Check weather and subscribe to updates"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Weather Subscription App
        </h1>

        <div className="w-full max-w-md mb-8">
          <form onSubmit={handleCitySubmit} className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded font-medium text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Weather"}
            </button>
          </form>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {weatherData && (
          <WeatherDisplay weatherData={weatherData} city={submittedCity} />
        )}

        {showSubscribe && (
          <div className="w-full max-w-md mt-8">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Subscribe to Weather Updates
            </h2>
            <SubscriptionForm city={submittedCity} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
