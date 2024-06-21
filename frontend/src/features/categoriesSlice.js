import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import categoryService from "../services/categoryService";

const initialState = {
  addCategory: null,
  editCategory: null,
  modifyCategory: null,
  removeCategory: null,
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      return await categoryService.fetchCategories();
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/addCategory",
  async (category, thunkAPI) => {
    try {
      return await categoryService.createCategory(category);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category, thunkAPI) => {
    try {
      return await categoryService.updateCategory(category);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (category, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(category);
    } catch (error) {
      const message = error.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetSuccessAndError: (state) => {
      state.isError = false;
      state.isSuccess = false;
    },
    resetCategoryModifiers: (state) => {
      state.addCategory = null;
      state.editCategory = null;
      state.removeCategory = null;
    },
    setAddCategory: (state, { payload }) => {
      state.addCategory = payload;
    },
    setEditCategory: (state, { payload }) => {
      state.editCategory = payload;
    },
    setRemoveCategory: (state, { payload }) => {
      state.removeCategory = payload;
    },
    setModifyCategory: (state, { payload }) => {
      state.modifyCategory = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.data;
        // state.isSuccess = true;
        state.isLoading = false;
        // state.message = payload.message;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.categories.push(payload.data);
        state.addCategory = null;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        const index = state.categories.findIndex(
          (category) => category.id === payload.data.id
        );
        state.categories[index] = payload.data;
        state.editCategory = null;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.categories = state.categories.filter(
          (category) => category.id !== payload.id
        );
        state.removeCategory = null;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = payload.message;
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.message = payload;
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const {
  reset,
  resetSuccessAndError,
  setAddCategory,
  setRemoveCategory,
  setEditCategory,
  setModifyCategory,
  resetCategoryModifiers,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
