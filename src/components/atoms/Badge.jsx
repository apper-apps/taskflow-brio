import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  size = "md", 
  className = "", 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-slate-700 text-slate-200",
    primary: "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30",
    success: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30",
    warning: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30",
    danger: "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/30",
    high: "priority-high text-white",
    medium: "priority-medium text-white",
    low: "priority-low text-white"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base"
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;