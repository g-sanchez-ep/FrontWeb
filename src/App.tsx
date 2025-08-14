// src/App.tsx - Versión ajustada

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registro from './views/Registro';
import Onboarding from './views/Onboarding';
import Resultado from './views/Resultado';
import './App.css'; // Asegúrate que este import esté presente

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Arrendadora de Vehículos</h1>
        </header>
        {/* Este es el único cambio: añadir className="App-main" */}
        <main className="App-main">
          <Routes>
            <Route path="/registro" element={<Registro />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/resultado" element={<Resultado />} />
            <Route path="/" element={<Navigate to="/registro" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;