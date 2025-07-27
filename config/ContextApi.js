// SectionContext.jsx
import React, { createContext, useContext, useState } from 'react';

const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('users');
  let [totalProd,setTotalProd] = useState(null)
  const [login,setLogin] = useState(false)

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection ,totalProd ,setTotalProd ,login,setLogin }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => useContext(SectionContext);
