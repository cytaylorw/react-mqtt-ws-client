import React from 'react';
import { AlertContext } from 'hooks/context/Contexts';

export default function AlertProvider({ children }){

  const [alert, setAlert] = React.useState(['error','test error']);

  return <AlertContext.Provider value={[alert, setAlert]}>{children}</AlertContext.Provider>
}