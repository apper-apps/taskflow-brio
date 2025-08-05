import React from "react";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";

const FilterBar = ({ 
  categories = [],
  selectedCategory, 
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  showCompleted,
  onToggleCompleted,
  onClearFilters,
  className = ""
}) => {
  const priorityOptions = [
    { value: "", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ];

const categoryOptions = [
    { value: "", label: "All Categories" },
    ...categories.map(cat => ({ value: cat.Id.toString(), label: cat.Name }))
  ];

  const hasActiveFilters = selectedCategory || selectedPriority || showCompleted;

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <Select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        options={categoryOptions}
        className="min-w-[150px]"
      />
      
      <Select
        value={selectedPriority}
        onChange={(e) => onPriorityChange(e.target.value)}
        options={priorityOptions}
        className="min-w-[150px]"
      />
      
      <Button
        variant={showCompleted ? "primary" : "outline"}
        onClick={onToggleCompleted}
        icon="CheckSquare"
        size="md"
      >
        {showCompleted ? "Hide" : "Show"} Completed
      </Button>
      
      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={onClearFilters}
          icon="X"
          size="sm"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default FilterBar;