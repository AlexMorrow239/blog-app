const getBlogs = async () => {
  try {
    const data = await fetch(
      "https://ix-blog-app-2d5c689132cd.herokuapp.com/api/blogs",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const blogsApiData = await data.json();
    return blogsApiData.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getBlogsByCategoryId = async (categoryId) => {
  try {
    const blogsRes = await fetch(
      "https://ix-blog-app-2d5c689132cd.herokuapp.com/api/blogs/category/" +
        categoryId,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const filteredBlogs = await blogsRes.json();
    return filteredBlogs.data;
  } catch (error) {
    console.log(error);
  }
};

const BlogService = {
  getBlogs,
  getBlogsByCategoryId,
};

export default BlogService;
