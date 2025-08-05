import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = () => new Promise(resolve => setTimeout(resolve, 200));

export const categoryService = {
  async getAll() {
    await delay();
    return [...categories].sort((a, b) => a.order - b.order);
  },

  async getById(id) {
    await delay();
    const category = categories.find(c => c.Id === parseInt(id));
    return category ? { ...category } : null;
  },

  async create(categoryData) {
    await delay();
    const newId = Math.max(...categories.map(c => c.Id)) + 1;
    const newCategory = {
      Id: newId,
      name: categoryData.name,
      color: categoryData.color,
      icon: categoryData.icon,
      order: newId
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updateData) {
    await delay();
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return null;
    
    const updatedCategory = {
      ...categories[index],
      ...updateData,
      Id: parseInt(id)
    };
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay();
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return false;
    
    categories.splice(index, 1);
    return true;
  }
};