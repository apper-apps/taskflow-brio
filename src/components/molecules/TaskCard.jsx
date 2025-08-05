import React, { useState } from "react";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const TaskCard = ({ 
  task, 
  category,
  onToggleComplete, 
  onEdit, 
  onDelete,
  className = ""
}) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    await onToggleComplete(task.Id);
    setIsCompleting(false);
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return "text-slate-400";
    
    const date = new Date(dueDate);
    if (isPast(date) && !isToday(date)) return "text-red-400";
    if (isToday(date)) return "text-yellow-400";
    return "text-slate-400";
  };

  const priorityVariants = {
    high: "high",
    medium: "medium", 
    low: "low"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={`glass-card rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={handleToggleComplete}
            disabled={isCompleting}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 transition-all duration-200 ${
              task.completed
                ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-500"
                : "border-slate-500 hover:border-primary"
            }`}
          >
            {task.completed && (
              <ApperIcon name="Check" size={12} className="text-white" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-lg leading-tight mb-2 ${
              task.completed ? "line-through text-slate-400" : "text-slate-100"
            }`}>
              {task.title}
            </h3>

            {task.description && (
              <p className={`text-sm leading-relaxed mb-3 ${
                task.completed ? "text-slate-500" : "text-slate-300"
              }`}>
                {task.description}
              </p>
            )}

            <div className="flex items-center flex-wrap gap-2">
              {category && (
                <Badge 
                  variant="primary" 
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <ApperIcon name={category.icon} size={12} />
                  <span>{category.name}</span>
                </Badge>
              )}

              {task.dueDate && (
                <div className={`text-xs font-medium flex items-center space-x-1 ${getDueDateColor(task.dueDate)}`}>
                  <ApperIcon name="Calendar" size={12} />
                  <span>{formatDueDate(task.dueDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-3">
          <div className={`w-3 h-3 rounded-full ${
            task.priority === "high" 
              ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse-gentle" 
              : task.priority === "medium"
              ? "bg-gradient-to-r from-yellow-500 to-orange-500"
              : "bg-gradient-to-r from-green-500 to-emerald-500"
          }`}></div>

          <Badge variant={priorityVariants[task.priority]} size="sm">
            {task.priority}
          </Badge>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              icon="Edit2"
              className="p-1.5 hover:bg-primary/20"
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.Id)}
              icon="Trash2"
              className="p-1.5 hover:bg-red-500/20 hover:text-red-400"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;