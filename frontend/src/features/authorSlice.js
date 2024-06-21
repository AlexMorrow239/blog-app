import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../services/authService";
import blogService from "../services/blogService";

const initialState = {
  author: null,
  editAuthor: null,
  authorBlogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Fetch Author
export const fetchAuthor = createAsyncThunk(
  "author/fetchAuthor",
  async (userData, thunkAPI) => {
    try {
      return await authService.getUser(userData);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAuthor = createAsyncThunk(
  "author/updateAuthor",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchBlogsByAuthorId = createAsyncThunk(
  "blogs/fetchBlogsByAuthorId",
  async (authorId, thunkAPI) => {
    try {
      return await blogService.fetchBlogsByAuthorId(authorId);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSuccessAndError: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetEditStatus: (state) => {
      state.isAuthorEditSuccess = false;
      state.isAuthorEditError = false;
      state.message = "";
    },
    setAuthor: (state, { payload }) => {
      state.author = payload;
    },
    setEditAuthor: (state, { payload }) => {
      state.editAuthor = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAuthor.fulfilled, (state, { payload }) => {
        state.author = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchAuthor.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(fetchBlogsByAuthorId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBlogsByAuthorId.fulfilled, (state, { payload }) => {
        state.authorBlogs = payload.data;
        state.isLoading = false;
        // state.isSuccess = true;
        state.isError = false;
        // state.message = payload.message;
      })
      .addCase(fetchBlogsByAuthorId.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })
      .addCase(updateAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAuthor.fulfilled, (state, { payload }) => {
        state.author = payload.data;
        state.editAuthor = null;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateAuthor.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.editAuthor = null;
        state.message = payload.message;
      });
  },
});

export const { reset, resetSuccessAndError, setAuthor, setEditAuthor } =
  authorSlice.actions;
export default authorSlice.reducer;
