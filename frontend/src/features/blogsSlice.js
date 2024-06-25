import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import blogService from "../services/blogService";

const initialState = {
  addBlog: null,
  editBlog: null,
  deleteBlog: null,
  blog: null,
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blog, thunkAPI) => {
    try {
      return await blogService.createBlog(blog);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, thunkAPI) => {
    try {
      return await blogService.fetchBlogs();
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchBlogsByCategoryId = createAsyncThunk(
  "blogs/fetchBlogsByCategoryId",
  async (categoryId, thunkAPI) => {
    try {
      return await blogService.fetchBlogsByCategoryId(categoryId || null);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (blogId, thunkAPI) => {
    try {
      return await blogService.fetchBlogById(blogId);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (blog, thunkAPI) => {
    try {
      return await blogService.updateBlog(blog);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteBlogById = createAsyncThunk(
  "blogs/deleteBlogById",
  async (blogId, thunkAPI) => {
    try {
      return await blogService.deleteBlog(blogId);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSuccessAndError: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setEditBlog: (state, { payload }) => {
      state.editBlog = payload;
      state.addBlog = null;
      state.deleteBlog = null;
    },
    setAddBlog: (state, { payload }) => {
      state.addBlog = payload;
      state.editBlog = null;
      state.deleteBlog = null;
    },
    setDeleteBlog: (state, { payload }) => {
      state.deleteBlog = payload;
      state.addBlog = null;
      state.editBlog = null;
    },
    setBlogs: (state, { payload }) => {
      state.blogs = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        state.blogs.push(payload.data);
        state.addBlog = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload.message;
      })
      .addCase(createBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, { payload }) => {
        state.blogs = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchBlogs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(fetchBlogsByCategoryId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogsByCategoryId.fulfilled, (state, { payload }) => {
        state.blogs = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchBlogsByCategoryId.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, { payload }) => {
        state.blog = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchBlogById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload.message;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, { payload }) => {
        const index = state.blogs.findIndex((x) => x.id === payload.data.id);
        state.blogs = state.blogs.filter((x) => x.id !== payload.data.id);
        state.blogs.splice(index, 0, payload.data);
        state.editBlog = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload.message;
      })
      .addCase(updateBlog.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(deleteBlogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogById.fulfilled, (state, { payload }) => {
        state.blogs = state.blogs.filter((x) => x.id !== payload.id);
        state.deleteBlog = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;

        state.message = payload.message;
      })
      .addCase(deleteBlogById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      });
  },
});

export const {
  reset,
  resetSuccessAndError,
  setAddBlog,
  setEditBlog,
  setDeleteBlog,
  setBlogs,
} = blogsSlice.actions;
export default blogsSlice.reducer;
