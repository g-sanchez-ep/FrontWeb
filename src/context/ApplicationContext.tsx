import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define la forma de tus datos globales
interface IApplicationState {
  email: string;
  phone: string;
  salary: number;
  resultStatus: 'aprobado' | 'rechazado' | null;
}

// 2. Define lo que el contexto proveerá
interface IApplicationContext {
  application: IApplicationState;
  saveRegistration: (data: { email: string; phone: string }) => void;
  saveOnboarding: (data: { salary: number; resultStatus: 'aprobado' | 'rechazado' }) => void;
}

// 3. Crea el contexto
const ApplicationContext = createContext<IApplicationContext | undefined>(undefined);

// 4. Crea el componente "Proveedor" que envolverá la app
export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [application, setApplication] = useState<IApplicationState>({
    email: '',
    phone: '',
    salary: 0,
    resultStatus: null,
  });

  // Función para guardar los datos del primer formulario
  const saveRegistration = (data: { email: string; phone: string }) => {
    setApplication(prev => ({ ...prev, ...data }));
  };

  // Función para guardar los datos del segundo formulario
  const saveOnboarding = (data: { salary: number; resultStatus: 'aprobado' | 'rechazado' }) => {
    setApplication(prev => ({ ...prev, ...data }));
  };

  const value = { application, saveRegistration, saveOnboarding };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

// 5. Crea un hook personalizado para usar el contexto fácilmente en otros componentes
export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplication debe ser usado dentro de un ApplicationProvider');
  }
  return context;
};
