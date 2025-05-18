"use client";
import React, { useState } from "react";

interface SubscriptionFormProps {
  city: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ city }) => {
  const [email, setEmail] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("daily");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email, city, frequency }),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || "Failed to subscribe");
      }

      setMessage(data);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error subscribing to weather updates"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Update Frequency:
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded font-medium text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Subscribing..." : `Subscribe for ${city} Weather Updates`}
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default SubscriptionForm;
