import React from "react";
import TaskList from "@/components/organisms/TaskList";

const UpcomingTasks = () => {
  return <TaskList filter="upcoming" />;
};

export default UpcomingTasks;