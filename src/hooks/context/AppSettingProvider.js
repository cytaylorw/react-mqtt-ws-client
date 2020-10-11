import React from 'react';
import os from 'os';
import useLocalStorage from 'hooks/useLocalStorage';
import { AppSettingContext } from 'hooks/context/Contexts';

const userLang = (navigator.language || navigator.userLanguage).split('-').join(''); 

export default function AppSettingProvider({ children }){

  const [appSetting, setAppSetting] = useLocalStorage('appSetting', {
    locale: userLang,
    filter: {
      time: [null,null],
      text: ['','']
    }
  })

  return <AppSettingContext.Provider value={[appSetting, setAppSetting]}>{children}</AppSettingContext.Provider>
}