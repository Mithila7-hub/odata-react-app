import React from 'react';
import './App.css';
import OrdersChart from './components/OrderChart/OrderChart';

const App: React.FC = () => {
  return (
    <div className="App">
      <h2 className='chart-title'>Skipum Frontend - Technical Challenge</h2>
      <OrdersChart />
    </div>
  );
};

export default App;
