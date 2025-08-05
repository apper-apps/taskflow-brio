import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  label,
  error,
  options = [],
  placeholder = "Select an option",
  className = "",
  containerClassName = "",
  children,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-4 py-3 bg-surface/50 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 appearance-none";
  
  const errorClasses = error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : "";

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-slate-200">
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            baseClasses,
            errorClasses,
className
          )}
          {...(() => {
            // Filter out potentially problematic props that could contain circular references
            const safePropFilter = (props) => {
              const safeProps = { ...props };
              // Remove props that commonly contain DOM elements or circular references
              delete safeProps.onChange;
              delete safeProps.onBlur;
              delete safeProps.onFocus;
              delete safeProps.key;
              delete safeProps.ref;
              delete safeProps.children;
              delete safeProps.className;
              delete safeProps.label;
              delete safeProps.error;
              delete safeProps.options;
              delete safeProps.placeholder;
              delete safeProps.containerClassName;
              
              // Remove any function properties to avoid potential circular refs
              Object.keys(safeProps).forEach(key => {
                if (typeof safeProps[key] === 'function') {
                  delete safeProps[key];
                }
              });
              
              return safeProps;
            };
            
            return safePropFilter(props);
          })()}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
        >
          {placeholder && (
            <option value="" disabled className="text-slate-400">
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-surface text-slate-100"
            >
              {option.label}
            </option>
          ))}
          
          {children}
        </select>
        
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <ApperIcon name="ChevronDown" size={18} className="text-slate-400" />
        </div>
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

Select.displayName = "Select";

export default Select;