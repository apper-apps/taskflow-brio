import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const taskService = {
  async getAll() {
    await delay();
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return a.order - b.order;
    });
  },

  async getById(id) {
    await delay();
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay();
    const newId = Math.max(...tasks.map(t => t.Id)) + 1;
    const newTask = {
      Id: newId,
      title: taskData.title,
      description: taskData.description || "",
      categoryId: parseInt(taskData.categoryId),
      priority: taskData.priority,
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      order: newId
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    const updatedTask = {
      ...tasks[index],
      ...updateData,
      Id: parseInt(id)
    };
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return false;
    
    tasks.splice(index, 1);
    return true;
  },

  async toggleComplete(id) {
    await delay();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index].completed = !tasks[index].completed;
    return { ...tasks[index] };
  },

  async getByCategory(categoryId) {
    await delay();
    return tasks
      .filter(t => t.categoryId === parseInt(categoryId))
      .sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return a.order - b.order;
      });
  },

  async getTodayTasks() {
    await delay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tasks
      .filter(t => {
        if (!t.dueDate) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate >= today && dueDate < tomorrow;
      })
      .sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return a.order - b.order;
      });
  },

  async getUpcomingTasks() {
    await delay();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return tasks
      .filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate >= tomorrow;
      })
      .sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA - dateB;
      });
  },

  async searchTasks(query) {
    await delay();
    const searchQuery = query.toLowerCase();
    return tasks
      .filter(t => 
        t.title.toLowerCase().includes(searchQuery) ||
        t.description.toLowerCase().includes(searchQuery)
      )
      .sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return a.order - b.order;
      });
  }
};