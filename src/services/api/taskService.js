// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const tableName = 'task';

export const taskService = {
  async getAll() {
    try {
      const params = {
        "fields": [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "title" } },
          { "field": { "Name": "description" } },
          { "field": { "Name": "priority" } },
          { "field": { "Name": "status" } },
          { "field": { "Name": "dueDate" } },
          { "field": { "Name": "completed" } },
          { "field": { "Name": "createdAt" } },
          { "field": { "Name": "order" } },
          { "field": { "Name": "categoryId" } }
        ],
        "orderBy": [
          { "fieldName": "completed", "sorttype": "ASC" },
          { "fieldName": "order", "sorttype": "ASC" }
        ],
        "pagingInfo": { "limit": 100, "offset": 0 }
      };

      const response = await apperClient.fetchRecords(tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return [];
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getById(id) {
    try {
      const params = {
        "fields": [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "title" } },
          { "field": { "Name": "description" } },
          { "field": { "Name": "priority" } },
          { "field": { "Name": "status" } },
          { "field": { "Name": "dueDate" } },
          { "field": { "Name": "completed" } },
          { "field": { "Name": "createdAt" } },
          { "field": { "Name": "order" } },
          { "field": { "Name": "categoryId" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, parseInt(id), params);

      if (!response || !response.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(taskData) {
    try {
      const params = {
        records: [{
          Name: taskData.title,
          title: taskData.title,
          description: taskData.description || "",
          priority: taskData.priority,
          status: taskData.status || "not_started",
          dueDate: taskData.dueDate || null,
          completed: taskData.completed || false,
          createdAt: new Date().toISOString(),
          order: taskData.order || 0,
          categoryId: parseInt(taskData.categoryId)
        }]
      };

      const response = await apperClient.createRecord(tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create task ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updateData.title && { Name: updateData.title, title: updateData.title }),
          ...(updateData.description !== undefined && { description: updateData.description }),
          ...(updateData.priority && { priority: updateData.priority }),
          ...(updateData.status && { status: updateData.status }),
          ...(updateData.dueDate !== undefined && { dueDate: updateData.dueDate }),
          ...(updateData.completed !== undefined && { completed: updateData.completed }),
          ...(updateData.order !== undefined && { order: updateData.order }),
          ...(updateData.categoryId && { categoryId: parseInt(updateData.categoryId) })
        }]
      };

      const response = await apperClient.updateRecord(tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update task ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }

        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete task ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async toggleComplete(id) {
    try {
      // First get the current task
      const currentTask = await this.getById(id);
      if (!currentTask) {
        throw new Error('Task not found');
      }

      // Toggle the completed status
      return await this.update(id, { completed: !currentTask.completed });
    } catch (error) {
      throw error;
    }
  },

  async getByCategory(categoryId) {
    try {
      const params = {
        "fields": [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "title" } },
          { "field": { "Name": "description" } },
          { "field": { "Name": "priority" } },
          { "field": { "Name": "status" } },
          { "field": { "Name": "dueDate" } },
          { "field": { "Name": "completed" } },
          { "field": { "Name": "createdAt" } },
          { "field": { "Name": "order" } },
          { "field": { "Name": "categoryId" } }
        ],
        "where": [
          {
            "FieldName": "categoryId",
            "Operator": "EqualTo",
            "Values": [parseInt(categoryId)]
          }
        ],
        "orderBy": [
          { "fieldName": "completed", "sorttype": "ASC" },
          { "fieldName": "order", "sorttype": "ASC" }
        ],
        "pagingInfo": { "limit": 100, "offset": 0 }
      };

      const response = await apperClient.fetchRecords(tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getTodayTasks() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const params = {
        "fields": [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "title" } },
          { "field": { "Name": "description" } },
          { "field": { "Name": "priority" } },
          { "field": { "Name": "status" } },
          { "field": { "Name": "dueDate" } },
          { "field": { "Name": "completed" } },
          { "field": { "Name": "createdAt" } },
          { "field": { "Name": "order" } },
          { "field": { "Name": "categoryId" } }
        ],
        "where": [
          {
            "FieldName": "dueDate",
            "Operator": "GreaterThanOrEqualTo",
            "Values": [today.toISOString()]
          },
          {
            "FieldName": "dueDate",
            "Operator": "LessThan",
            "Values": [tomorrow.toISOString()]
          }
        ],
        "orderBy": [
          { "fieldName": "completed", "sorttype": "ASC" },
          { "fieldName": "order", "sorttype": "ASC" }
        ],
        "pagingInfo": { "limit": 100, "offset": 0 }
      };

      const response = await apperClient.fetchRecords(tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching today's tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getUpcomingTasks() {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const params = {
        "fields": [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "title" } },
          { "field": { "Name": "description" } },
          { "field": { "Name": "priority" } },
          { "field": { "Name": "status" } },
          { "field": { "Name": "dueDate" } },
          { "field": { "Name": "completed" } },
          { "field": { "Name": "createdAt" } },
          { "field": { "Name": "order" } },
          { "field": { "Name": "categoryId" } }
        ],
        "where": [
          {
            "FieldName": "dueDate",
            "Operator": "GreaterThanOrEqualTo",
            "Values": [tomorrow.toISOString()]
          },
          {
            "FieldName": "completed",
            "Operator": "EqualTo",
            "Values": [false]
          }
        ],
        "orderBy": [
          { "fieldName": "dueDate", "sorttype": "ASC" }
        ],
        "pagingInfo": { "limit": 100, "offset": 0 }
      };

      const response = await apperClient.fetchRecords(tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching upcoming tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async searchTasks(query) {
    try {
      const params = {
        "fields": [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "title" } },
          { "field": { "Name": "description" } },
          { "field": { "Name": "priority" } },
          { "field": { "Name": "status" } },
          { "field": { "Name": "dueDate" } },
          { "field": { "Name": "completed" } },
          { "field": { "Name": "createdAt" } },
          { "field": { "Name": "order" } },
          { "field": { "Name": "categoryId" } }
        ],
        "whereGroups": [
          {
            "operator": "OR",
            "subGroups": [
              {
                "conditions": [
                  {
                    "fieldName": "title",
                    "operator": "Contains",
                    "values": [query]
                  }
                ],
                "operator": "OR"
              },
              {
                "conditions": [
                  {
                    "fieldName": "description",
                    "operator": "Contains",
                    "values": [query]
                  }
                ],
                "operator": "OR"
              }
            ]
          }
        ],
        "orderBy": [
          { "fieldName": "completed", "sorttype": "ASC" },
          { "fieldName": "order", "sorttype": "ASC" }
        ],
        "pagingInfo": { "limit": 100, "offset": 0 }
      };

      const response = await apperClient.fetchRecords(tableName, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
}
};