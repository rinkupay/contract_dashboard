const API_BASE_URL = '';

export const authService = {
  login: async (username, password) => {
    // Mock authentication
    if (password !== 'test123') {
      throw new Error('Invalid credentials');
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      user: {
        id: '1',
        username,
        email: `${username}@example.com`,
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },
};

export const contractsService = {
  getContracts: async () => {
    const response = await fetch(`${API_BASE_URL}/contracts.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch contracts');
    }
    return response.json();
  },

  getContractDetail: async (contractId) => {
    const response = await fetch(`${API_BASE_URL}/contract-details.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch contract details');
    }
    const data = await response.json();
    return data[contractId] || null;
  },
};

export const uploadService = {
  uploadFile: async (file) => {
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock success/failure
    const success = Math.random() > 0.1; // 90% success rate
    
    return {
      success,
      message: success ? 'File uploaded successfully' : 'Upload failed',
    };
  },
};
