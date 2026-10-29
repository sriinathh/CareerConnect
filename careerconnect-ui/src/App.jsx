import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { AppRoutes } from './routes/AppRoutes';
import './styles/index.css';
import './styles/App.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}
