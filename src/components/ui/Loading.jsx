import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg w-48"></div>
        <div className="h-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg w-32"></div>
      </div>
      
      {/* Task cards skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="glass-card rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-5 h-5 bg-slate-600 rounded border-2 mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full"></div>
                <div className="h-6 bg-slate-700 rounded px-2 w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;