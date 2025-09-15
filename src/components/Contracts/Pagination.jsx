import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/slices/contractsSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = () => {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.contracts);

  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
  const startItem = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endItem = Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, pagination.currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{pagination.totalItems}</span> results
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                page === pagination.currentPage
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
