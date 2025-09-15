# Contract Management Dashboard

A modern, production-ready SaaS contracts management dashboard built with React, Tailwind CSS, and Redux Toolkit.

## 🚀 Features

### Authentication
- Secure login system with JWT token management
- Protected routes with automatic redirection
- Persistent authentication state

### Dashboard
- **Contracts Overview**: Comprehensive table view with all contract data
- **Advanced Filtering**: Search by name/parties, filter by status and risk level
- **Pagination**: Efficient data pagination with 10 items per page
- **Statistics Cards**: Real-time metrics for total, active, renewal due, and high-risk contracts
- **Responsive Design**: Mobile-first approach with responsive layouts

### Contract Details
- **Metadata Display**: Complete contract information including dates, parties, and status
- **Clause Analysis**: AI-powered clause extraction with confidence scores
- **Risk Assessment**: Intelligent risk analysis with severity indicators
- **Evidence Panel**: Side drawer with relevant contract snippets and relevance scores
- **Quick Actions**: Download, share, and view evidence functionality

### File Upload
- **Drag & Drop Interface**: Modern file upload with drag and drop support
- **Multiple File Support**: Upload multiple contracts simultaneously
- **Progress Tracking**: Real-time upload status with success/error indicators
- **File Validation**: Support for PDF, DOC, DOCX files up to 10MB each

### User Experience
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Empty States**: Helpful empty state messages with actionable guidance
- **Responsive Sidebar**: Collapsible navigation with mobile optimization

## 🛠 Tech Stack

- **Frontend**: React 18 with JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Code Quality**: ESLint

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rinkupay/contract_dashboard.git
   cd contracts-dashboard
   ```

 **Deployed on Vercel**  LINK : https://contract-dashboard-indol.vercel.app/login

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔐 Authentication

The application uses mock authentication for demonstration purposes:

- **Username**: Any valid username
- **Password**: `test123` (required)
- **Token**: Automatically generated and stored in localStorage

## 📊 Mock Data

The application includes comprehensive mock data:

- **8 Sample Contracts**: Various statuses (Active, Expired, Renewal Due) and risk levels
- **Detailed Contract Information**: Start/expiry dates, parties, clauses, insights, and evidence
- **Realistic Data**: Industry-standard contract types and risk scenarios



### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Sidebar, Topbar)
│   ├── Contracts/      # Contract-specific components
│   ├── Upload/         # File upload components
│   └── ContractDetail/ # Contract detail components
├── pages/              # Page components
├── store/              # Redux store configuration
│   ├── slices/         # Redux slices
│   └── thunks/         # Async thunks
├── services/           # API service functions

```

### State Management
- **Auth Slice**: User authentication and session management
- **Contracts Slice**: Contract data, filtering, and pagination
- **UI Slice**: Modal states, sidebar visibility, and loading states

### API Layer
- **Mock Services**: Simulated API calls with realistic delays
- **Error Handling**: Comprehensive error catching and user feedback


## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint










## 🙏 Acknowledgments

- **Design Inspiration**: Modern SaaS dashboard patterns
- **Icons**: Lucide React icon library
- **Styling**: Tailwind CSS framework
- **State Management**: Redux Toolkit 
- **Build Tool**: Vite 

