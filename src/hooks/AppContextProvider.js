import React from 'react'
import MqttProvider from 'hooks/context/MqttProvider';
import MqttSettingProvider from 'hooks/context/MqttSettingProvider';
import AppSettingProvider from 'hooks/context/AppSettingProvider';
import AlertProvider from 'hooks/context/AlertProvider';
import ErrorBoundary from 'errorBoundary/ErrorBoundary';
import AppThemeProvider from 'components/themes/AppThemeProvider';

export * from 'hooks/context/Contexts';

export default function AppContextProvider(props){
    const {
        children
    } = props;
    return (
        <ErrorBoundary>
            <AppSettingProvider>
                <AppThemeProvider>
                    <AlertProvider>
                        <MqttSettingProvider>
                            <MqttProvider>
                                    { children }
                            </MqttProvider>
                        </MqttSettingProvider>
                    </AlertProvider>
                </AppThemeProvider>
            </AppSettingProvider>
        </ErrorBoundary>
    )
}