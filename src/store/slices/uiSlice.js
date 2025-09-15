import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  uploadModalOpen: false,
  evidenceDrawerOpen: false,
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setUploadModalOpen: (state, action) => {
      state.uploadModalOpen = action.payload;
    },
    setEvidenceDrawerOpen: (state, action) => {
      state.evidenceDrawerOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setUploadModalOpen,
  setEvidenceDrawerOpen,
  setLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
