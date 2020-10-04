import React from 'react'
import MqttProvider from 'hooks/context/MqttProvider';
import MqttSettingProvider from 'hooks/context/MqttSettingProvider';

export * from 'hooks/context/Contexts';

export default function AppContextProvider({ children }){
    return (
        <MqttSettingProvider>
            <MqttProvider>
                { children }
            </MqttProvider>
        </MqttSettingProvider>
    )
}