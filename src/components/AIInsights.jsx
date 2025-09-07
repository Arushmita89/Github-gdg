import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Button from "../ui/button";

const AIInsights = ({ repository, languages = {}, contributors = [], commitData = [] }) => {
  const [insights, setInsights] = useState({
    repoSummary: "",
    languageAnalysis: "",
    contributionPatterns: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAIInsights = async (repo, langs, contribs, commits) => {
    const prompt = `
      Repository Description: ${repo.description || "N/A"}
      README Content: ${repo.readme || "N/A"}
      Languages: ${JSON.stringify(langs)}
      Contributors: ${JSON.stringify(contribs)}
      Commit Data (weekly): ${JSON.stringify(commits)}

      Generate:
      1. AI Repository Summary
      2. AI Language Analysis
      3. AI Contribution Patterns
    `;
    const response = await fetch("/api/generate-insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return {
      repoSummary: data.repoSummary || "No summary available",
      languageAnalysis: data.languageAnalysis || "No language analysis available",
      contributionPatterns: data.contributionPatterns || "No contribution insights available",
    };
  };

  useEffect(() => {
    if (!repository) return;

    const getInsights = async () => {
      setLoading(true);
      try {
        const aiData = await fetchAIInsights(repository, languages, contributors, commitData);
        setInsights(aiData);
      } catch (err) {
        console.error("Error fetching AI insights:", err);
        setError("Failed to generate AI insights.");
      } finally {
        setLoading(false);
      }
    };

    getInsights();
  }, [repository, languages, contributors, commitData]);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>AI-Generated Insights</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center text-gray-500">
          Generating insights…
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>AI-Generated Insights</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center text-red-500 gap-2">
          <p>{error}</p>
          <Button onClick={() => setError(null)}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI-Generated Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Repository Summary</h3>
          <p>{insights.repoSummary}</p>
        </div>
        <div>
          <h3 className="font-semibold">Language Analysis</h3>
          <p>{insights.languageAnalysis}</p>
        </div>
        <div>
          <h3 className="font-semibold">Contribution Patterns</h3>
          <p>{insights.contributionPatterns}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
