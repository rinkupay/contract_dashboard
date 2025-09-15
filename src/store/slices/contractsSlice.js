import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  contracts: [],
  currentContract: null,
  loading: false,
  error: null,
  filters: {
    status: '',
    risk: '',
    search: '',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  },
};

// Async thunks
export const fetchContracts = createAsyncThunk(
  'contracts/fetchContracts',
  async () => {
    const response = await fetch('/contracts.json');
    if (!response.ok) {
      throw new Error('Failed to fetch contracts');
    }
    return response.json();
  }
);

export const fetchContractDetail = createAsyncThunk(
  'contracts/fetchContractDetail',
  async (contractId) => {
    const response = await fetch('/contract-details.json');
    if (!response.ok) {
      throw new Error('Failed to fetch contract details');
    }
    const data = await response.json();
    return data[contractId] || null;
  }
);

const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    clearCurrentContract: (state) => {
      state.currentContract = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = action.payload;
        state.pagination.totalItems = action.payload.length;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contracts';
      })
      .addCase(fetchContractDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContractDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContract = action.payload;
      })
      .addCase(fetchContractDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contract details';
      });
  },
});

export const { setFilters, setCurrentPage, clearCurrentContract } = contractsSlice.actions;
export default contractsSlice.reducer;
