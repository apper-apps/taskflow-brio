import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started organizing your day",
  actionLabel = "Add Task",
  onAction,
  icon = "CheckSquare",
  className = ""
}) => {
  return (
    <div className={`text-center py-16 px-6 ${className}`}>
      <div className="mx-auto max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
          <ApperIcon name={icon} size={48} className="text-primary" />
        </div>
        
        <h3 className="text-2xl font-display font-semibold text-slate-100 mb-3">
          {title}
        </h3>
        
        <p className="text-slate-400 mb-8 leading-relaxed text-lg">
          {description}
        </p>
        
        {onAction && (
          <button
            onClick={onAction}
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <ApperIcon name="Plus" size={20} />
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;