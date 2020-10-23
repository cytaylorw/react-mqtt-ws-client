import React from 'react';
import * as defaultLocales from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as locales from 'lib/i18n';
import { AppSettingContext } from 'hooks/context/Contexts';
import moment from "moment";
import 'moment/locale/zh-tw';

moment.locale('en');

const supportLocales = Object.keys(locales);

export default function AppThemeProvider(props) {
    const {
        children,
    } = props;
    const [appSetting, ] = React.useContext(AppSettingContext);

    const theme = React.useMemo(
      () => createMuiTheme({
          supportLocales,
          typography: {
            fontFamily: '"Roboto", "Noto Sans TC", "Helvetica", "Arial", sans-serif',
          },
          palette: {
            type: appSetting.darkMode ? 'dark' : 'light',
            primary: {
              light: '#B5C7D3',
              main: '#658DC6',
              dark: '#0F4C81'
            },
            secondary: {
              light: '#F2D6AE',
              main: '#F5B895',
              dark: '#A58D7F'
            },
          },
          ...defaultLocales[appSetting.locale], 
          ...locales[appSetting.locale],
          i18n: function(component, key, defaultText){ 
            return this.text?.[component]?.[key] ?? defaultText[key]
          }
        }),
      [appSetting.darkMode, appSetting.locale]
    );

    return (
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={`${appSetting.locale.substring(0, 2)}-${appSetting.locale.substring(2, 4)}`}>
          {children}
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }