import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      <div className="glass-card rounded-2xl p-8 mx-auto max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-slate-100 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-slate-400 mb-6 leading-relaxed">
          {message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <ApperIcon name="RotateCcw" size={16} />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;