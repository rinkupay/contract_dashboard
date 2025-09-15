import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, AlertTriangle, CheckCircle, Clock, XCircle, FileText } from 'lucide-react';

const ContractsTable = ({ contracts, loading }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Expired':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Renewal Due':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'Renewal Due':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (contracts.length === 0) {
    return (
      <div className="card text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contract Name
              </th>
              <th className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parties
              </th>
              <th className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Score
              </th>
              <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contracts.map((contract) => (
              <tr
                key={contract.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                onClick={() => navigate(`/contracts/${contract.id}`)}
              >
                <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-2 sm:mr-3 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                        {contract.name}
                      </div>
                      <div className="sm:hidden text-xs text-gray-500 truncate">
                        {contract.parties}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                  <div className="text-xs sm:text-sm text-gray-900 truncate">{contract.parties}</div>
                </td>
                <td className="hidden md:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                  <div className="flex items-center text-xs sm:text-sm text-gray-900">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">{formatDate(contract.expiry)}</span>
                  </div>
                </td>
                <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                  <div className="flex items-center">
                    {getStatusIcon(contract.status)}
                    <span className={`ml-1 sm:ml-2 inline-flex px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}`}>
                      <span className="hidden sm:inline">{contract.status}</span>
                      <span className="sm:hidden">{contract.status.charAt(0)}</span>
                    </span>
                  </div>
                </td>
                <td className="hidden lg:table-cell px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className={`inline-flex px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full ${getRiskColor(contract.risk)}`}>
                      {contract.risk}
                    </span>
                  </div>
                </td>
                <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/contracts/${contract.id}`);
                    }}
                    className="text-primary-600 hover:text-primary-900 text-xs sm:text-sm font-medium"
                  >
                    <span className="hidden sm:inline">View Details</span>
                    <span className="sm:hidden">View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractsTable;
