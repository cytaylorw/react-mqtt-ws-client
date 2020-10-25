import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { AlertContext } from 'hooks/context/Contexts';

let timeoutHandler = null;

const defaultMessages = {
  MQTT_CONNECT: (url) => `Connecting to ${url}...`,
  MQTT_CONNECT_TIMEOUT: 'Connection timeout.',
  MQTT_DISCONNECT: 'Disconnecting...',
  MQTT_SUBSCRIBE: (topic) => `Subscribing to ${topic}...`,
  MQTT_SUBSCRIBE_FAIL: (topic) => `Can not subscribe to ${topic}`,
  MQTT_UNSUBSCRIBE: (topic) => `Unsubscribing from ${topic}...`,
  MQTT_PUBLISHED: 'Published succesfully.',
  MQTT_ON_CONNECT: 'Connected.',
  MQTT_ON_CLOSE: 'Connection closed.',
  MQTT_ON_RECONNECT: 'Reconnecting...',
  MQTT_ON_OFFLINE: 'MQTT Offlined.',
  MQTT_PLAY: 'Updating messages...',
  MQTT_PAUSE: 'Pause message.',
  FILTER_INVALID_TIME_RANGE: 'Invalid time range.',
  CONVERTER_INVALID: 'Selected converter function does not exist.'

}

export default function AlertProvider({ children }){
  const theme = useTheme();
  const [alert, setAlert] = React.useState([]);
  const setMessage = ([severity, errorCode, ...arg]) => {
    clearTimeout(timeoutHandler);
    const message = theme?.messages?.[errorCode] ?? 
      defaultMessages?.[errorCode] ?? 
      errorCode;
    setAlert([severity, typeof message === 'function' ? message(arg) : message]);
  }
  const clearMessage = (timeout) => {
    clearTimeout(timeoutHandler);
    timeoutHandler = setTimeout(() => setAlert([]), timeout ?? 100);
  }

  return <AlertContext.Provider value={[alert, setMessage, clearMessage]}>{children}</AlertContext.Provider>
}