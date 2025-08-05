import React from "react";
import TaskList from "@/components/organisms/TaskList";

const TodayTasks = () => {
  return <TaskList filter="today" />;
};

export default TodayTasks;