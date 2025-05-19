import React from "react";
import { WeatherData } from "#/types";

interface WeatherDisplayProps {
  weatherData: WeatherData;
  city: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  city,
}) => {
  return (
    <div className="w-full max-w-md bg-blue-50 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold  mb-4">
        Current Weather in {city}
      </h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">🌡️ Temperature:</span>{" "}
          {weatherData.temperature}°C
        </p>
        <p>
          <span className="font-semibold">💧 Humidity:</span> {weatherData.humidity}%
        </p>
        <p>
          <span className="font-semibold">🌥️ Description:</span>{" "}
          {weatherData.description}
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
