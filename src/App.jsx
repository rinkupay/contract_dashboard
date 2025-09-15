import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './components/Login';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ContractDetail from './pages/ContractDetail';
import UploadModal from './components/Upload/UploadModal';
import EvidenceDrawer from './components/ContractDetail/EvidenceDrawer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/contracts/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ContractDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          
          {/* Global Modals */}
          <UploadModal />
          <EvidenceDrawer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
