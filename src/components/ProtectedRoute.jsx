import { Navigate } from 'react-router-dom';
import useStore from '../store/useStore';

const ProtectedRoute = ({ children, requiredStep }) => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.selectedCategories);

  if (requiredStep === 'register') {
    if (!user) return <Navigate to="/" replace />;
  }

  if (requiredStep === 'categories') {
    if (!user) return <Navigate to="/" replace />;
    if (!selectedCategories || selectedCategories.length < 3) return <Navigate to="/categories" replace />;
  }

  return children;
};

export default ProtectedRoute;
