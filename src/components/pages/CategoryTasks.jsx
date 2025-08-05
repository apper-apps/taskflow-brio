import React from "react";
import { useParams } from "react-router-dom";
import TaskList from "@/components/organisms/TaskList";

const CategoryTasks = () => {
  const { categoryId } = useParams();
  
  return <TaskList categoryId={categoryId} />;
};

export default CategoryTasks;