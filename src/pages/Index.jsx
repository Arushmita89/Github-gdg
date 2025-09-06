import React, { useState } from "react";
import GitHubInputForm from "../components/GitHubInputForm";
import RepositoryDashboard from "../components/RepositoryDashboard";
import { useToast } from "../hooks/use-toast";
import ThemeToggle from "../components/theme-toggle";

function Index() {
  const [repositoryData, setRepositoryData] = useState(null);
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRepositorySubmit = async ({ repoData, languagesData, contributorsData }) => {
    setLoading(true);
    try {
      setRepositoryData(repoData);
      setLanguages(languagesData);

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

  const handleBack = () => {
    setRepositoryData(null);
    setLanguages({});
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {!repositoryData ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
            <GitHubInputForm onSubmit={handleRepositorySubmit} loading={loading} />

            <div className="max-w-2xl mx-auto mt-16 text-center text-gray-700 dark:text-gray-300">
              <p>Analyze GitHub repositories with detailed insights and beautiful visualizations.</p>
            </div>
          </div>
        ) : (
          <RepositoryDashboard
            repository={repositoryData}
            languages={languages}
            loading={loading}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}

export default Index;
