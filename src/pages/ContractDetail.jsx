import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractDetail, clearCurrentContract } from '../store/slices/contractsSlice';
import { setEvidenceDrawerOpen } from '../store/slices/uiSlice';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  XCircle,
  FileText,
  Eye,
  TrendingUp,
  Shield
} from 'lucide-react';

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentContract, loading, error } = useSelector((state) => state.contracts);

  useEffect(() => {
    if (id) {
      dispatch(fetchContractDetail(id));
    }
    return () => {
      dispatch(clearCurrentContract());
    };
  }, [dispatch, id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Expired':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Renewal Due':
        return <Clock className="h-5 w-5 text-yellow-500" />;
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
      month: 'long',
      day: 'numeric',
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRelevanceColor = (relevance) => {
    if (relevance >= 0.8) return 'text-green-600';
    if (relevance >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="card">
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentContract) {
    return (
      <div className="card text-center py-12">
        <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Contract not found</h3>
        <p className="text-gray-500 mb-4">{error || 'The requested contract could not be found.'}</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-primary"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentContract.name}</h1>
            <p className="text-gray-600">{currentContract.parties}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {getStatusIcon(currentContract.status)}
            <span className={`ml-2 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(currentContract.status)}`}>
              {currentContract.status}
            </span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-gray-400" />
            <span className={`ml-2 inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRiskColor(currentContract.risk)}`}>
              {currentContract.risk} Risk
            </span>
          </div>
        </div>
      </div>

      {/* Contract Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-medium text-gray-900">{formatDate(currentContract.start)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Expiry Date</p>
                  <p className="font-medium text-gray-900">{formatDate(currentContract.expiry)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Parties</p>
                  <p className="font-medium text-gray-900">{currentContract.parties}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Contract ID</p>
                  <p className="font-medium text-gray-900">{currentContract.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => dispatch(setEvidenceDrawerOpen(true))}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>View Evidence</span>
              </button>
              <button className="w-full btn-secondary">
                Download Contract
              </button>
              <button className="w-full btn-secondary">
                Share Contract
              </button>
            </div>
          </div>

          {/* Risk Summary */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Risk</span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(currentContract.risk)}`}>
                  {currentContract.risk}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">High Risk Items</span>
                <span className="text-sm font-medium text-gray-900">
                  {currentContract.insights.filter(i => i.risk === 'High').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Clauses Analyzed</span>
                <span className="text-sm font-medium text-gray-900">
                  {currentContract.clauses.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clauses Section */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract Clauses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentContract.clauses.map((clause, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{clause.title}</h3>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className={`text-sm font-medium ${getConfidenceColor(clause.confidence)}`}>
                    {Math.round(clause.confidence * 100)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{clause.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Risk Analysis</h2>
        <div className="space-y-4">
          {currentContract.insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
              <div className="flex-shrink-0">
                {insight.risk === 'High' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                {insight.risk === 'Medium' && <TrendingUp className="h-5 w-5 text-yellow-500" />}
                {insight.risk === 'Low' && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(insight.risk)}`}>
                    {insight.risk} Risk
                  </span>
                </div>
                <p className="text-sm text-gray-700">{insight.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;
