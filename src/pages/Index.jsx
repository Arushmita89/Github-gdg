import React, { useState } from "react";
import GitHubInputForm from "../components/GitHubInputForm";
import { useToast } from "../hooks/use-toast";
import ThemeToggle from "../components/theme-toggle";

const Index = () => {
  const [repositoryData, setRepositoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRepositorySubmit = async ({ repoData, languagesData, contributorsData }) => {
    setLoading(true);
    try {
      setRepositoryData({ repoData, languagesData, contributorsData });
      toast({
        title: "Repository Analyzed! 🎉",
        description: `Successfully fetched ${repoData.full_name}`,
      });
    } catch (error) {
      console.error("Error handling repository data:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze repository.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setRepositoryData(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {!repositoryData ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
            <GitHubInputForm onSubmit={handleRepositorySubmit} loading={loading} />

            <div className="max-w-2xl mx-auto mt-16 text-center">
              <p className="text-muted-foreground">
                Analyze GitHub repositories with detailed insights and beautiful visualizations.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              &larr; Back
            </button>

            <h2 className="text-2xl font-bold">{repositoryData.repoData.full_name}</h2>
            <p>{repositoryData.repoData.description}</p>

            <div>
              <h3 className="font-semibold mt-4">Languages:</h3>
              <ul>
                {Object.entries(repositoryData.languagesData).map(([lang, bytes]) => (
                  <li key={lang}>
                    {lang}: {bytes} bytes
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mt-4">Top Contributors:</h3>
              <ul>
                {repositoryData.contributorsData.map((contributor) => (
                  <li key={contributor.id}>
                    {contributor.login} ({contributor.contributions} contributions)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
