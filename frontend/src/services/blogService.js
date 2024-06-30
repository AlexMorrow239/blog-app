const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const createBlog = async (blog) => {
  const response = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
    body: blog,
  });

  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

const fetchBlogs = async () => {
  const response = await fetch(`${BASE_URL}/blogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

const fetchBlogByID = async (id) => {
  const response = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

const fetchBlogsByCategoryId = async (categoryId) => {
  const response = await fetch(`${BASE_URL}/blogs/categories/${categoryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

const fetchBlogsByAuthorId = async (authorId) => {
  const response = await fetch(`${BASE_URL}/blogs/author/${authorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

const updateBlog = async (blog) => {
  const response = await fetch(`${BASE_URL}/blogs/${blog.get("id")}`, {
    method: "PUT",
    headers: {
      authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
    body: blog,
  });
  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

const deleteBlog = async (id) => {
  const response = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
  });

  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const blogsApiData = await response.json();
  return blogsApiData;
};

const blogService = {
  createBlog,
  fetchBlogs,
  fetchBlogByID,
  fetchBlogsByCategoryId,
  fetchBlogsByAuthorId,
  updateBlog,
  deleteBlog,
};

export default blogService;
