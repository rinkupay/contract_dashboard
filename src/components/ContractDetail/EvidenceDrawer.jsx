import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEvidenceDrawerOpen } from '../../store/slices/uiSlice';
import { X, FileText, TrendingUp } from 'lucide-react';

const EvidenceDrawer = () => {
  const dispatch = useDispatch();
  const { evidenceDrawerOpen } = useSelector((state) => state.ui);
  const { currentContract } = useSelector((state) => state.contracts);

  const handleClose = () => {
    dispatch(setEvidenceDrawerOpen(false));
  };

  const getRelevanceColor = (relevance) => {
    if (relevance >= 0.8) return 'text-green-600 bg-green-50';
    if (relevance >= 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (!evidenceDrawerOpen || !currentContract) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">Evidence & Sources</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Contract Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{currentContract.name}</h3>
                <p className="text-sm text-gray-600">{currentContract.parties}</p>
              </div>

              {/* Evidence Items */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Retrieved Evidence</h3>
                <div className="space-y-4">
                  {currentContract.evidence.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{item.source}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-gray-400" />
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRelevanceColor(item.relevance)}`}>
                            {Math.round(item.relevance * 100)}% relevant
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-3">
                        <p className="text-sm text-gray-700 italic">"{item.snippet}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-primary-900 mb-2">Analysis Summary</h3>
                <div className="space-y-2 text-sm text-primary-800">
                  <div className="flex justify-between">
                    <span>Total Evidence Items:</span>
                    <span className="font-medium">{currentContract.evidence.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>High Relevance Items:</span>
                    <span className="font-medium">
                      {currentContract.evidence.filter(e => e.relevance >= 0.8).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Relevance:</span>
                    <span className="font-medium">
                      {Math.round(
                        (currentContract.evidence.reduce((sum, e) => sum + e.relevance, 0) / 
                         currentContract.evidence.length) * 100
                      )}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="flex-1 btn-secondary"
              >
                Close
              </button>
              <button className="flex-1 btn-primary">
                Export Evidence
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvidenceDrawer;
