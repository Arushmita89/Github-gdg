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
        title: "Repository Analyzed!",
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <header className="bg-blue-600 dark:bg-blue-800 text-white py-4 shadow-md">
        <h1 className="text-center text-2xl font-bold">GitHub Repo Analyser</h1>
      </header>

      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
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
      </main>

      {/*Footer*/}
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 mt-auto text-center text-sm">
        &copy; {new Date().getFullYear()} GitHub Repo Analyser. Built by Arushmita.
      </footer>
    </div>
  );
}

export default Index;
