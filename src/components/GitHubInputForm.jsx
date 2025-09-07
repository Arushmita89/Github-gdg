import React, { useState } from "react";
import RepositoryDashboard from "./RepositoryDashboard";

// Safe placeholder for demo purposes
const GITHUB_PAT = "dummy_token";

const GitHubInputForm = () => {
  const [input, setInput] = useState("");
  const [repository, setRepository] = useState(null);
  const [languages, setLanguages] = useState({});
  const [commitData, setCommitData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);

    // Demo: fake repository data
    const repoData = { name: input, description: "Demo repository" };
    const langData = { JavaScript: 50, CSS: 30, HTML: 20 };
    const formattedCommits = [
      { week: "Week 1", commits: 5, dateRange: "01/01/2025" },
      { week: "Week 2", commits: 8, dateRange: "01/08/2025" },
      { week: "Week 3", commits: 3, dateRange: "01/15/2025" },
      { week: "Week 4", commits: 10, dateRange: "01/22/2025" },
    ];

    // Simulate API delay
    setTimeout(() => {
      setRepository(repoData);
      setLanguages(langData);
      setCommitData(formattedCommits);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!repository ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            placeholder="owner/repository"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 rounded w-64 text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Fetch Repository
          </button>
        </form>
      ) : (
        <RepositoryDashboard
          repository={repository}
          languages={languages}
          commitData={commitData}
          loading={loading}
          onBack={() => setRepository(null)}
        />
      )}
    </div>
  );
};

export default GitHubInputForm;
