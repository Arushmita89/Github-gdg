import React, { useState } from "react";
import Input from "./ui/input";
import Button from "./ui/button";
import github from "../services/github"; 

const GitHubInputForm = ({ onSubmit, loading }) => {
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <Input
        placeholder="Repository Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        required
      />
      <Input
        placeholder="Repository Name"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        required
      />
      <Button type="submit" variant="primary" size="md" disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Repository"}
      </Button>
    </form>
  );
};

export default GitHubInputForm;
