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
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Current Weather in {city}
      </h2>
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-medium">Temperature:</span>{" "}
          {weatherData.temperature}°C
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Humidity:</span> {weatherData.humidity}%
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Description:</span>{" "}
          {weatherData.description}
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
