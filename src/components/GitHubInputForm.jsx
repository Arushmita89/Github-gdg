import React, { useState } from "react";
import RepositoryDashboard from "./RepositoryDashboard";

const GITHUB_PAT = "token"; //replace with pat

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

    try {
      const repoRes = await fetch(`https://api.github.com/repos/${input}`, {
        headers: { Authorization: `token ${GITHUB_PAT}` },
      });
      if (!repoRes.ok) throw new Error("Repository not found or unauthorized");
      const repoData = await repoRes.json();
      setRepository(repoData);

      const langRes = await fetch(repoData.languages_url, {
        headers: { Authorization: `token ${GITHUB_PAT}` },
      });
      const langData = await langRes.json();
      setLanguages(langData);

      const commitRes = await fetch(
        `https://api.github.com/repos/${input}/stats/commit_activity`,
        { headers: { Authorization: `token ${GITHUB_PAT}` } }
      );
      let commitActivity = await commitRes.json();
      if (!Array.isArray(commitActivity)) commitActivity = [];

      const formattedCommits = commitActivity.map((week, idx) => ({
        week: `Week ${idx + 1}`,
        commits: week.total,
        dateRange: `${new Date(week.week * 1000).toLocaleDateString()}`, 
      }));

      setCommitData(formattedCommits);
    } catch (err) {
      console.error("Error fetching repository:", err);
      setRepository(null);
      setLanguages({});
      setCommitData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!repository ? (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="owner/repository"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 rounded w-64 text-black"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
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
