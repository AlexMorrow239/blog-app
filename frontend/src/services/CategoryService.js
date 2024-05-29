const createCategory = async (category) => {
  const response = await fetch("http://localhost:8000/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: category,
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }
  const responseData = await response.json();
  return responseData;
};

const fetchCategories = async () => {
  const response = await fetch("http://localhost:8000/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};

const updateCategory = async (category) => {
  const response = await fetch("http://localhost:8000/api/categories", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: category,
  });

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};

const deleteCategoryById = async (category) => {
  const response = await fetch(
    "http://localhost:8000/api/categories/" + category.id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    let res = await response.json();
    throw res;
  }

  const responseData = await response.json();
  return responseData;
};

const CategoryService = {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategoryById,
};

export default CategoryService;
