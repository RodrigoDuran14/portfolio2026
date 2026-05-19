import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { usePortfolio } from './context/PortfolioContext';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

const AppRoutes = () => {
  const { data, loading } = usePortfolio();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Cargando...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<ProjectDetail />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;