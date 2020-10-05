import React from 'react'
import MqttProvider from 'hooks/context/MqttProvider';
import MqttSettingProvider from 'hooks/context/MqttSettingProvider';
import AlertProvider from 'hooks/context/AlertProvider';
import ErrorBoundary from 'errorBoundary/ErrorBoundary';

export * from 'hooks/context/Contexts';

export default function AppContextProvider({ children }){
    return (
        <ErrorBoundary>
            <AlertProvider>
                <MqttSettingProvider>
                    <MqttProvider>
                        { children }
                    </MqttProvider>
                </MqttSettingProvider>
            </AlertProvider>
        </ErrorBoundary>
    )
}