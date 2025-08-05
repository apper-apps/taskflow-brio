import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskCard from "@/components/molecules/TaskCard";
import TaskModal from "@/components/molecules/TaskModal";
import FilterBar from "@/components/molecules/FilterBar";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const TaskList = ({ filter = "all", categoryId = null }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, categoriesData] = await Promise.all([
        getTasksByFilter(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const getTasksByFilter = async () => {
    if (categoryId) {
      return await taskService.getByCategory(categoryId);
    }
    
    switch (filter) {
      case "today":
        return await taskService.getTodayTasks();
      case "upcoming":
        return await taskService.getUpcomingTasks();
      default:
        return await taskService.getAll();
    }
  };

  useEffect(() => {
    loadData();
  }, [filter, categoryId]);

  useEffect(() => {
    if (searchQuery) {
      const searchTasks = async () => {
        try {
          const results = await taskService.searchTasks(searchQuery);
          setTasks(results);
        } catch (err) {
          toast.error("Search failed");
        }
      };
      searchTasks();
    } else {
      loadData();
    }
  }, [searchQuery]);

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      setModalLoading(true);
      
      let savedTask;
      if (editingTask) {
        savedTask = await taskService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(task => 
          task.Id === editingTask.Id ? savedTask : task
        ));
        toast.success("Task updated successfully!");
      } else {
        savedTask = await taskService.create(taskData);
        setTasks(prev => [savedTask, ...prev]);
        toast.success("Task created successfully!");
      }
      
      setModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      toast.error("Failed to save task");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedCategory && task.categoryId !== parseInt(selectedCategory)) {
      return false;
    }
    if (selectedPriority && task.priority !== selectedPriority) {
      return false;
    }
    if (!showCompleted && task.completed) {
      return false;
    }
    return true;
  });

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === categoryId);
  };

  const getFilterTitle = () => {
    if (categoryId) {
      const category = getCategoryById(parseInt(categoryId));
      return category ? category.name : "Category Tasks";
    }
    
    switch (filter) {
      case "today":
        return "Today's Tasks";
      case "upcoming":
        return "Upcoming Tasks";
      default:
        return "All Tasks";
    }
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedPriority("");
    setShowCompleted(false);
    setSearchQuery("");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold gradient-text">
          {getFilterTitle()}
        </h1>
        <button
          onClick={handleCreateTask}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <span className="text-xl font-bold">+</span>
          <span>Add Task</span>
        </button>
      </div>

      <div className="space-y-4">
        <SearchBar 
          onSearch={setSearchQuery}
          className="max-w-md"
        />
        
<FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(value) => setSelectedCategory(typeof value === 'string' ? value : value?.target?.value || '')}
          selectedPriority={selectedPriority}
          onPriorityChange={(value) => setSelectedPriority(typeof value === 'string' ? value : value?.target?.value || '')}
          showCompleted={showCompleted}
          onToggleCompleted={() => setShowCompleted(!showCompleted)}
          onClearFilters={clearFilters}
        />
      </div>

      {filteredTasks.length === 0 ? (
        <Empty
          title={searchQuery ? "No tasks found" : "No tasks yet"}
          description={searchQuery ? `No tasks match "${searchQuery}"` : "Create your first task to get started organizing your day"}
          actionLabel="Add Task"
          onAction={handleCreateTask}
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.Id}
                task={task}
                category={getCategoryById(task.categoryId)}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
        categories={categories}
        loading={modalLoading}
      />
    </div>
  );
};

export default TaskList;