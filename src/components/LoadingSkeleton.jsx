import React from "react";
import { Card, CardContent, CardHeader } from "../components/ui/card";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full skeleton"></div>
            <div className="space-y-2">
              <div className="skeleton h-8 w-48 rounded"></div>
              <div className="skeleton h-4 w-32 rounded"></div>
            </div>
          </div>
          <div className="skeleton h-6 w-96 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-10 w-20 rounded"></div>
          <div className="skeleton h-10 w-32 rounded"></div>
        </div>
      </div>

      {/* Statistics Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="skeleton h-5 w-5 rounded"></div>
                <div className="space-y-2">
                  <div className="skeleton h-6 w-16 rounded"></div>
                  <div className="skeleton h-4 w-12 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }, (_, i) => (
          <Card key={i} className="card-elevated">
            <CardHeader>
              <div className="skeleton h-6 w-48 rounded"></div>
              <div className="skeleton h-4 w-64 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="skeleton h-64 w-full rounded-lg"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Repository Info Skeleton */}
      <Card className="card-glow">
        <CardHeader>
          <div className="skeleton h-6 w-48 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {Array.from({ length: 2 }, (_, i) => (
                <div key={i} className="space-y-2">
                  <div className="skeleton h-4 w-24 rounded"></div>
                  <div className="skeleton h-5 w-32 rounded"></div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {Array.from({ length: 2 }, (_, i) => (
                <div key={i} className="space-y-2">
                  <div className="skeleton h-4 w-24 rounded"></div>
                  <div className="skeleton h-5 w-32 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingSkeleton;
