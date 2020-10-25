import React from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import { AppSettingContext } from 'hooks/context/Contexts';


const userLang = (navigator.language || navigator.userLanguage).split('-').join(''); 

export default function AppSettingProvider({ children }){
  
  const [appSetting, setAppSetting] = useLocalStorage('appSetting', {
    locale: userLang,
    darkMode: false,
    filterOn: false,
    filter: {
      time: [null,null],
      text: ['','']
    }
  })

  return <AppSettingContext.Provider value={[appSetting, setAppSetting]}>{children}</AppSettingContext.Provider>
}