import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApplicationProvider } from './context/ApplicationContext';


import Registro from './views/Registro';
import Onboarding from './views/Onboarding';
import Resultado from './views/Resultado';
import './App.css';

function App() {
  return (

    <ApplicationProvider>
      <Router>
        <div className="App">

          <ToastContainer
            theme="dark"
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
          />

          <header className="App-header">
            <h1>Renta de Vehículos</h1>
          </header>

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
    </ApplicationProvider>
  );
}

export default App;