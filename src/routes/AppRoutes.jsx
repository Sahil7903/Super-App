import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import Categories from '../pages/Categories';
import Dashboard from '../pages/Dashboard';
import Entertainment from '../pages/Entertainment';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        
        <Route 
          path="/categories" 
          element={
            <ProtectedRoute requiredStep="register">
              <Categories />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute requiredStep="categories">
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/movies" 
          element={
            <ProtectedRoute requiredStep="categories">
              <Entertainment />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
