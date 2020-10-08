import React from 'react';
import os from 'os';
import useLocalStorage from 'hooks/useLocalStorage';
import { MqttSettingContext } from 'hooks/context/Contexts';

export default function MqttSettingProvider({ children }){

  const [mqttSetting, setMqttSetting] = useLocalStorage('mqttSetting', {
    url: window.location.protocol === 'https:' ? 'wss://' : 'ws://',
    clientId: `mqtt-ws-client-${Date.now().toString(36)}`,
    anomynous: false,
    username: '',
    password: '',
    topic: ['', 0],
    subscribeTo: {topic: '', qos: 0, converter: 'default'},
    publishTo: {topic: '', qos: 0},
    locale: 'zhTW'
  })

  return <MqttSettingContext.Provider value={[mqttSetting, setMqttSetting]}>{children}</MqttSettingContext.Provider>
}