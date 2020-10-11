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

const defaultTheme = createMuiTheme({
    supportLocales,
    typography: {
      fontFamily: '"Roboto", "Noto Sans TC", "Helvetica", "Arial", sans-serif'
    }
});
// defaultTheme.typography.fontFamily = 'Noto Sans TC", ' + defaultTheme.typography.fontFamily;

export default function AppThemeProvider(props) {
    const {
        children,
        // locale
    } = props;
    const [appSetting, setAppSetting] = React.useContext(AppSettingContext);
    const theme = createMuiTheme(defaultTheme, {
      ...defaultLocales[appSetting.locale], 
      ...locales[appSetting.locale],
      i18n: function(component, key, defaultText){ 
        return this.text && this.text[component] && this.text[component][key] ? this.text[component][key] : defaultText[key]
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={`${appSetting.locale.substring(0, 2)}-${appSetting.locale.substring(2, 4)}`}>
          {children}
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }