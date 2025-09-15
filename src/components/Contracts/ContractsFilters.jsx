import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../store/slices/contractsSlice';
import { Search, Filter, X } from 'lucide-react';

const ContractsFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.contracts);

  const handleSearchChange = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  const handleStatusChange = (e) => {
    dispatch(setFilters({ status: e.target.value }));
  };

  const handleRiskChange = (e) => {
    dispatch(setFilters({ risk: e.target.value }));
  };

  const clearFilters = () => {
    dispatch(setFilters({ search: '', status: '', risk: '' }));
  };

  const hasActiveFilters = filters.search || filters.status || filters.risk;

  return (
    <div className="card mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Search */}
        <div className="w-full">
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contracts..."
              value={filters.search}
              onChange={handleSearchChange}
              className="input-field pl-8 sm:pl-10 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <select
              value={filters.status}
              onChange={handleStatusChange}
              className="input-field min-w-[100px] sm:min-w-[120px] text-sm sm:text-base"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Renewal Due">Renewal Due</option>
            </select>
          </div>

          <select
            value={filters.risk}
            onChange={handleRiskChange}
            className="input-field min-w-[100px] sm:min-w-[120px] text-sm sm:text-base"
          >
            <option value="">All Risk</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-secondary flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base px-2 sm:px-4 py-1.5 sm:py-2"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Search: "{filters.search}"
                <button
                  onClick={() => dispatch(setFilters({ search: '' }))}
                  className="ml-2 hover:text-primary-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Status: {filters.status}
                <button
                  onClick={() => dispatch(setFilters({ status: '' }))}
                  className="ml-2 hover:text-primary-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.risk && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                Risk: {filters.risk}
                <button
                  onClick={() => dispatch(setFilters({ risk: '' }))}
                  className="ml-2 hover:text-primary-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractsFilters;
