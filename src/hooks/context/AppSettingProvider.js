import React from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import { AppSettingContext } from 'hooks/context/Contexts';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const userLang = (navigator.language || navigator.userLanguage).split('-').join(''); 

export default function AppSettingProvider({ children }){
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  console.log(prefersDarkMode)
  const [appSetting, setAppSetting] = useLocalStorage('appSetting', {
    locale: userLang,
    darkMode: prefersDarkMode,
    filterOn: false,
    filter: {
      time: [null,null],
      text: ['','']
    }
  })

  return <AppSettingContext.Provider value={[appSetting, setAppSetting]}>{children}</AppSettingContext.Provider>
}