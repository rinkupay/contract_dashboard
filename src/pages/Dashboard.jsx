import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContracts } from '../store/slices/contractsSlice';
import ContractsFilters from '../components/Contracts/ContractsFilters';
import ContractsTable from '../components/Contracts/ContractsTable';
import Pagination from '../components/Contracts/Pagination';
import { FileText, TrendingUp, AlertTriangle, Clock } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { contracts, loading, filters, pagination } = useSelector((state) => state.contracts);

  useEffect(() => {
    dispatch(fetchContracts());
  }, [dispatch]);

  // Filter and search contracts
  const filteredContracts = useMemo(() => {
    let filtered = contracts;

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (contract) =>
          contract.name.toLowerCase().includes(searchLower) ||
          contract.parties.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter((contract) => contract.status === filters.status);
    }

    // Risk filter
    if (filters.risk) {
      filtered = filtered.filter((contract) => contract.risk === filters.risk);
    }

    return filtered;
  }, [contracts, filters]);

  // Paginate contracts
  const paginatedContracts = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredContracts.slice(startIndex, endIndex);
  }, [filteredContracts, pagination.currentPage, pagination.itemsPerPage]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = contracts.length;
    const active = contracts.filter((c) => c.status === 'Active').length;
    const renewalDue = contracts.filter((c) => c.status === 'Renewal Due').length;
    const highRisk = contracts.filter((c) => c.risk === 'High').length;

    return { total, active, renewalDue, highRisk };
  }, [contracts]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="card p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-primary-100 rounded-lg">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary-600" />
            </div>
            <div className="ml-2 sm:ml-3 lg:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="card p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-600" />
            </div>
            <div className="ml-2 sm:ml-3 lg:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Active</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="card p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-yellow-600" />
            </div>
            <div className="ml-2 sm:ml-3 lg:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Renewal</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stats.renewalDue}</p>
            </div>
          </div>
        </div>

        <div className="card p-3 sm:p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 sm:p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-red-600" />
            </div>
            <div className="ml-2 sm:ml-3 lg:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">High Risk</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stats.highRisk}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ContractsFilters />

      {/* Contracts Table */}
      <ContractsTable contracts={paginatedContracts} loading={loading} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default Dashboard;
