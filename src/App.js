import React from 'react';
import SortingVisualiser from './SortingVisualiser/SortingVisualiser';
import './App.css';

function App() {
  console.log('Rendering App component');
  return (
    <div className="App">
      <SortingVisualiser></SortingVisualiser>
    </div>
  );
}

export default App;
