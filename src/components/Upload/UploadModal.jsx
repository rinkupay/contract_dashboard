import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUploadModalOpen } from '../../store/slices/uiSlice';
import { uploadService } from '../../services/api';
import { X, Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const UploadModal = () => {
  const dispatch = useDispatch();
  const { uploadModalOpen } = useSelector((state) => state.ui);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleClose = () => {
    dispatch(setUploadModalOpen(false));
    setUploadedFiles([]);
  };

  const handleFileUpload = async (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading',
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload for each file
    for (const uploadFile of newFiles) {
      try {
        const result = await uploadService.uploadFile(uploadFile.file);
        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === uploadFile.id
              ? { ...f, status: result.success ? 'success' : 'error', message: result.message }
              : f
          )
        );
      } catch (error) {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === uploadFile.id
              ? { ...f, status: 'error', message: 'Upload failed' }
              : f
          )
        );
      }
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!uploadModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Upload Contracts</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
              ${isDragOver 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-gray-600 mb-4">
              Support for PDF, DOC, DOCX files up to 10MB each
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileInputChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="btn-primary cursor-pointer inline-block"
            >
              Choose Files
            </label>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {file.status === 'uploading' && (
                        <div className="flex items-center space-x-2">
                          <Loader className="h-4 w-4 animate-spin text-primary-600" />
                          <span className="text-sm text-gray-600">Uploading...</span>
                        </div>
                      )}
                      {file.status === 'success' && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600">Success</span>
                        </div>
                      )}
                      {file.status === 'error' && (
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-600">Error</span>
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 rounded-md hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClose}
            className="btn-secondary"
          >
            Close
          </button>
          {uploadedFiles.some(f => f.status === 'success') && (
            <button
              onClick={handleClose}
              className="btn-primary"
            >
              Process Files
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
