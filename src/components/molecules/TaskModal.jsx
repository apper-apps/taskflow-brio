import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  task = null,
  categories = [],
  loading = false
}) => {
const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    status: "not_started",
    dueDate: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        categoryId: task.categoryId?.toString() || "",
        priority: task.priority || "medium",
        status: task.status || "not_started",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd'T'HH:mm") : ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        categoryId: "",
        priority: "medium",
        status: "not_started",
        dueDate: ""
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const taskData = {
      ...formData,
      categoryId: parseInt(formData.categoryId),
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    };

    await onSave(taskData);
  };

  const priorityOptions = [
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ];

  const categoryOptions = categories.map(cat => ({
    value: cat.Id.toString(),
    label: cat.name
  }));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-semibold gradient-text">
                {task ? "Edit Task" : "Create New Task"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                icon="X"
                className="p-2 hover:bg-red-500/20"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Task Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter task title..."
                error={errors.title}
                disabled={loading}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Add task description..."
                  rows={3}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-surface/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 resize-none"
                />
              </div>

              <Select
                label="Category"
                value={formData.categoryId}
                onChange={(e) => handleInputChange("categoryId", e.target.value)}
                options={categoryOptions}
                placeholder="Select a category"
                error={errors.categoryId}
                disabled={loading}
              />

              <Select
                label="Priority"
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
                options={priorityOptions}
                disabled={loading}
              />

              <Input
                label="Due Date"
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                disabled={loading}
              />

              <div className="flex items-center space-x-3 pt-4">
                <Button
                  type="submit"
                  loading={loading}
                  className="flex-1"
                >
                  {task ? "Update Task" : "Create Task"}
</Button>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Status
                  </label>
                  <Select
                    value={formData.status}
                    onChange={(value) => handleInputChange("status", value)}
                    options={[
                      { value: "not_started", label: "Not Started" },
                      { value: "in_progress", label: "In Progress" },
                      { value: "completed", label: "Completed" },
                      { value: "on_hold", label: "On Hold" }
                    ]}
                    className="w-full"
                  />
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;