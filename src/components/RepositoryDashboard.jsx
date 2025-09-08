import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import Button from "./ui/button";
import { Star, GitFork, AlertCircle, Calendar, Code, Shield } from "lucide-react";
import LanguageChart from "./charts/LanguageChart";
import CommitActivityChart from "./charts/CommitActivityChart";
import AIInsights from "./AIInsights";
import { useTheme } from "./theme-provider";

const RepositoryDashboard = ({
  repository,
  languages = {},
  commitData = [],
  loading = false,
  onBack,
}) => {
  const { theme } = useTheme();
  const cardBg = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";

  const [contributors, setContributors] = useState([]);
  const [readme, setReadme] = useState("");

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  useEffect(() => {
    if (!repository) return;

    const fetchExtraData = async () => {
      try {
        const contribRes = await fetch(
          `https://api.github.com/repos/${repository.full_name}/contributors?per_page=10`,
          { headers: { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}` } }
        );
        const contribData = await contribRes.json();
        setContributors(Array.isArray(contribData) ? contribData : []);

        const readmeRes = await fetch(
          `https://api.github.com/repos/${repository.full_name}/readme`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GITHUB_PAT}`,
              Accept: "application/vnd.github.v3.raw",
            },
          }
        );
        const readmeText = await readmeRes.text();
        setReadme(readmeText || "");
      } catch (err) {
        console.error("Error fetching extra repo data:", err);
      }
    };

    fetchExtraData();
  }, [repository]);

  return (
    <div
      className={`space-y-6 animate-fade-in ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      {/*Header*/}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
              className="w-12 h-12 rounded-full border-2 border-border"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{repository.name}</h1>
              <p className="text-muted-foreground">
                by{" "}
                <a
                  href={repository.owner.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {repository.owner.login}
                </a>
              </p>
            </div>
          </div>
          {repository.description && (
            <p className="text-muted-foreground text-lg max-w-2xl">
              {repository.description}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={onBack} variant="outline" className="border border-neutral-600 rounded-md">
            ← Back
          </Button>
          <Button asChild variant="hero" className="border border-neutral-600 rounded-md">
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer" >
              View on GitHub
            </a>
          </Button>
        </div>
      </div>

      {/*Stats*/}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={`card-glow ${cardBg}`}>
          <CardContent className="flex flex-row items-center justify-center h-32 space-x-2">
            <Star className="h-5 w-5 text-warning" />
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-bold">{formatNumber(repository.stargazers_count)}</p>
              <p className="text-sm text-muted-foreground">Stars</p>
            </div>
          </CardContent>
        </Card>

        <Card className={`card-glow ${cardBg}`}>
          <CardContent className="flex flex-row items-center justify-center h-32 space-x-2">
            <GitFork className="h-5 w-5 text-accent" />
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-bold">{formatNumber(repository.forks_count)}</p>
              <p className="text-sm text-muted-foreground">Forks</p>
            </div>
          </CardContent>
        </Card>

        <Card className={`card-glow ${cardBg}`}>
          <CardContent className="flex flex-row items-center justify-center h-32 space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-bold">{formatNumber(repository.open_issues_count)}</p>
              <p className="text-sm text-muted-foreground">Issues</p>
            </div>
          </CardContent>
        </Card>

        <Card className={`card-glow ${cardBg}`}>
          <CardContent className="flex flex-row items-center justify-center h-32 space-x-2">
            <Shield className="h-5 w-5 text-success" />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold truncate">
                {repository.license?.name || "No License"}
              </p>
              <p className="text-sm text-muted-foreground">License</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/*Language Chart*/}
        <Card className={`card-elevated ${cardBg} flex-1`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Language Composition
            </CardTitle>
            <CardDescription>
              Distribution of programming languages in this repository
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LanguageChart languages={languages} />
          </CardContent>
        </Card>

        {/*Commit Activity Chart*/}
        <Card className={`card-elevated ${cardBg} flex-1`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Commit Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            <CommitActivityChart commitData={commitData} loading={loading} />
          </CardContent>
        </Card>
      </div>

      {/*AI Insights*/}
      <div className="mt-6">
        <AIInsights
          repoData={{
            ...repository,
            readme,
            languages,
            contributors,
            commitData,
          }}
        />
      </div>
    </div>
  );
};

export default RepositoryDashboard;
