import React from 'react'
import MqttProvider from 'hooks/context/MqttProvider';
import MqttSettingProvider from 'hooks/context/MqttSettingProvider';
import AlertProvider from 'hooks/context/AlertProvider';
import ErrorBoundary from 'errorBoundary/ErrorBoundary';
import AppThemeProvider from 'components/themes/AppThemeProvider';

export * from 'hooks/context/Contexts';

export default function AppContextProvider(props){
    const {
        children,
        locale
    } = props;
    return (
        <ErrorBoundary>
            <AlertProvider>
                <MqttSettingProvider>
                    <MqttProvider>
                        <AppThemeProvider locale={locale}>
                            { children }
                        </AppThemeProvider>
                    </MqttProvider>
                </MqttSettingProvider>
            </AlertProvider>
        </ErrorBoundary>
    )
}