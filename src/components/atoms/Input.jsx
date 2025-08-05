import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Input = forwardRef(({ 
  type = "text",
  label,
  error,
  icon,
  iconPosition = "left",
  className = "",
  containerClassName = "",
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 bg-surface/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200";
  
  const errorClasses = error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : "";
  const iconClasses = icon ? (iconPosition === "left" ? "pl-11" : "pr-11") : "";

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-slate-200">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={cn(
            "absolute inset-y-0 flex items-center pointer-events-none z-10",
            iconPosition === "left" ? "left-3" : "right-3"
          )}>
            <ApperIcon 
              name={icon} 
              size={18} 
              className={cn(
                "text-slate-400",
                props.disabled && "text-slate-500"
              )} 
            />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={cn(
            baseClasses,
            iconClasses,
            errorClasses,
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-400 flex items-center space-x-1">
          <ApperIcon name="AlertCircle" size={14} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;