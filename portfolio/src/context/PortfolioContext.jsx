import { createContext, useContext, useState, useEffect } from 'react';
import portfolioData from '../data/portfolioData.json';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos carga asíncrona (podría ser fetch si el JSON viniera de una API)
    setData(portfolioData.es);
    setLoading(false);
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};