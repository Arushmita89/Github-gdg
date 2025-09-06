import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Github } from "lucide-react";
import Input from "./ui/input";
import Button from "./ui/button";
import github from "../services/github"; 

function GitHubInputForm({ onSubmit, loading }) {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!owner.trim() || !repo.trim()) return;

    try {
      const repoData = await github.getRepository(owner, repo);
      const languagesData = await github.getRepositoryLanguages(owner, repo);
      const contributorsData = await github.getContributors(owner, repo);

      onSubmit({ repoData, languagesData, contributorsData });
    } catch (error) {
      console.error("Error fetching repository:", error);
      alert("Failed to fetch repository. Check console for details.");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg">
      {/* Card Header */}
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg">
            <Github className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
          GitHub Repository Analyzer
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Get AI-powered insights and comprehensive analysis of any GitHub repository
        </CardDescription>
      </CardHeader>

      {/* Card Content with Form */}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Repository Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600"
          />
          <Input
            placeholder="Repository Name"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
          >
            {loading ? "Analyzing..." : "Analyze Repository"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default GitHubInputForm;
