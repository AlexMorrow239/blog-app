async function getCategories() {
  try {
    const response = await fetch(
      "https://ix-blog-app-2d5c689132cd.herokuapp.com/api/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const allCategories = await response.json();
    return allCategories.data;
  } catch (error) {
    throw new Error(error);
  }
}

const CategoryService = {
  getCategories,
};

export default CategoryService;
