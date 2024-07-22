import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch place predictions, but don't store them directly in history
export const fetchPlaces = createAsyncThunk('search/fetchPlaces', async (query) => {
  const response = await fetch(`/maps/api/place/autocomplete/json?input=${query}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
  const data = await response.json();
  return data.predictions;
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    history: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // No changes to history here
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToHistory, clearHistory } = searchSlice.actions;

export default searchSlice.reducer;