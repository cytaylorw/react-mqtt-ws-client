import React from 'react';
import * as defaultLocales from '@material-ui/core/locale';
import * as locales from 'lib/i18n';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MqttSettingContext } from 'hooks/context/Contexts';

const supportLocales = Object.keys(locales);
// supportLocales.forEach((locale) => {
//   locales[locale] = {...defaultLocales[locale], ...locales[locale]} 
// })
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
    const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
    const theme = createMuiTheme(defaultTheme, {
      ...defaultLocales[mqttSetting.locale], 
      ...locales[mqttSetting.locale],
      i18n: function(component, key, defaultText){ 
        return this.text && this.text[component] && this.text[component][key] ? this.text[component][key] : defaultText[key]
      }
    });
    return (
      <ThemeProvider theme={theme}>
          {children}
      </ThemeProvider>
    );
  }