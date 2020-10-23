import React from 'react';
import { AlertContext } from 'hooks/context/Contexts';

export default function AlertProvider({ children }){

  const [alert, setAlert] = React.useState([]);
  const clearAlert = (timeout) => {
    setTimeout(() => setAlert([]), timeout ?? 100);
  }

  return <AlertContext.Provider value={[alert, setAlert, clearAlert]}>{children}</AlertContext.Provider>
}