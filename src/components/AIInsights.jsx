import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Loader2, AlertTriangle } from "lucide-react";

export default function AIInsights({ repoData }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInsights = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5174/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoData }),
      });

      if (!res.ok) throw new Error("Failed to fetch insights");

      const data = await res.json();
      setInsights(data.insights);
    } catch (err) {
      console.error(err);
      setError("Unable to load insights. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title, content) => (
    <div className="mb-6">
      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">
        {title}
      </h3>
      {content ? (
        content
          .split(/\n+/)
          .filter(Boolean)
          .map((paragraph, idx) => (
            <p key={idx} className="mb-2 text-gray-700 dark:text-gray-300">
              {paragraph.trim()}
            </p>
          ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No information available.</p>
      )}
    </div>
  );

  return (
    <Card className="shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          AI-Powered Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing repository...</span>
          </div>
        ) : error ? (
          <div className="flex items-start gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : insights ? (
          <>
            {renderSection("AI Repository Summary", insights.summary)}
            {renderSection("AI Language Analysis", insights.language)}
            {renderSection("AI Contribution Patterns", insights.contribution)}
          </>
        ) : (
          <button
            onClick={fetchInsights}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Generate Insights
          </button>
        )}
      </CardContent>
    </Card>
  );
}
