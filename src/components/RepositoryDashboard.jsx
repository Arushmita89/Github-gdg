import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import Badge from "./ui/badge";
import Button from "./ui/button";
import { Star, GitFork, AlertCircle, ExternalLink, Users, Calendar, Code, Shield } from "lucide-react";
import LanguageChart from "./charts/LanguageChart";
import CommitActivityChart from "./charts/CommitActivityChart";
import LoadingSkeleton from "./LoadingSkeleton";
import { useTheme } from "./theme-provider";

const RepositoryDashboard = ({ repository, languages = {}, loading = false, onBack }) => {
    const { theme } = useTheme(); 

    if (loading) return <LoadingSkeleton />; 
    if (!repository) return null;

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    const cardBg = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";

    return (
        <div className={`space-y-6 animate-fade-in ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
            {/* Header */}
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
                        <p className="text-muted-foreground text-lg max-w-2xl">{repository.description}</p>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button onClick={onBack} variant="outline">
                        ← Back
                    </Button>
                    <Button asChild variant="hero">
                        <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on GitHub
                        </a>
                    </Button>
                </div>
            </div>

            {/* Core Stats */}
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
                            <p className="text-lg font-bold truncate">{repository.license?.name || "No License"}</p>
                            <p className="text-sm text-muted-foreground">License</p>
                        </div>
                    </CardContent>
                </Card>
            </div>


            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className={`card-elevated ${cardBg}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Code className="h-5 w-5" />
                            Language Composition
                        </CardTitle>
                        <CardDescription>Distribution of programming languages in this repository</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LanguageChart languages={languages} />
                    </CardContent>
                </Card>

                <Card className={`card-elevated ${cardBg}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Commit Activity
                        </CardTitle>
                        <CardDescription>Development activity over the past weeks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CommitActivityChart repository={repository.full_name} />
                    </CardContent>
                </Card>
            </div>

            {/* Repository Info */}
            <Card className={`card-glow ${cardBg}`}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Repository Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Created</p>
                                <p>{formatDate(repository.created_at)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                <p>{formatDate(repository.updated_at)}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Primary Language</p>
                                <Badge variant="secondary" className="mt-1">
                                    {repository.language || "Not specified"}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Watchers</p>
                                <p>{formatNumber(repository.subscribers_count)}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className={`card-elevated ${cardBg}`}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">AI-Generated Insights</CardTitle>
                    <CardDescription>
                        AI-powered analysis coming soon - will include repository summary, language analysis, and contribution patterns
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted/50 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground italic">
                            AI insights will be available in the next update. This will include automated repository summaries,
                            technology stack analysis, and collaboration health insights.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RepositoryDashboard;
