import React from 'react';
import mqtt from 'mqtt';
import { AlertContext,  MqttContext} from 'hooks/context/Contexts';
import { messageConverter } from 'lib/converter/MessageConverter';

const ACTIONS = {
  INIT: 'init',
  CONNECT: 'connect',
  SUBSCRIBE: 'subscribe',
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBE: 'unsubscribe',
  UNSUBSCRIBED: 'unsubscribed',
  PUBLISH: 'publish',
  DISCONNECT: 'disconnect',
  ON_CONNECT: 'onConnect',
  ON_RECONNECT: 'onReconnect',
  ON_CLOSE: 'onClose',
  ON_OFFLINE: 'onOffline',
  ON_ERROR: 'onError',
  ON_MESSAGE: 'onMessage',
  UPDATE_STATUS: 'updateStatus',
  UPDATE_MESSAGES: 'updateMessages',
  TOGGLE_PAUSE: 'togglePause',
}

let messageBuffer = [{messages: []}];
let timeoutHandle = null;
let connectTimeout = null;
let alertTimeout = null;

const setAlertTimeout = (state, alert) => {
  clearTimeout(alertTimeout);
  alertTimeout = setTimeout(() => {
    state.setAlert(alert);
    if(alert[0] === 'info' || alert[0] === 'success') state.clearAlert(1000);
  }, 100)
}

const mqttReducer = (state, action) => {
  switch(action.type){
    case ACTIONS.ON_MESSAGE:
      const last = messageBuffer.length - 1;
      messageBuffer[last].messages.push(messageConverter[state.subscribedTo.converter](action));
      if(!timeoutHandle && !state.pause){
        timeoutHandle = setTimeout(() => state.dispatch({type: ACTIONS.UPDATE_MESSAGES}), state.updateInterval)
      }
      return state;
    case ACTIONS.UPDATE_MESSAGES:
      messageBuffer.push({messages: []});
      timeoutHandle = null;
      const newMessages = messageBuffer[0].messages;
      messageBuffer.shift();
      return {
        ...state,
        messages: [...state.messages, ...newMessages],
        messagesCount: state.messagesCount+newMessages.length
      };
    case ACTIONS.INIT:
      return {...state, dispatch: action.dispatch};
    case ACTIONS.CONNECT:
      if(state.mqtt && state.mqtt.connected) state.mqtt.end();
      const mqttSetting = action.setting;
      try {        
        const instance = mqtt.connect(mqttSetting.url, {
          ...mqttSetting,
          username: mqttSetting.anomynous ? undefined : mqttSetting.username,
          password: mqttSetting.anomynous ? undefined : mqttSetting.password,
          reconnectPeriod: 0
        });
        instance.on('connect', () => state.dispatch({type: ACTIONS.ON_CONNECT, status: 'connected'}));
        instance.on('reconnect', () => state.dispatch({type: ACTIONS.ON_RECONNECT, status: 'reconnecting'}));
        instance.on('close', () => state.dispatch({type: ACTIONS.ON_CLOSE, status: 'closed'}));
        instance.on('offline', () => state.dispatch({type: ACTIONS.ON_OFFLINE, status: 'offline'}));
        instance.on('error', (error) => state.dispatch({type: ACTIONS.ON_ERROR, error}));
        instance.on('message', (topic, message, packet) => state.dispatch({type: ACTIONS.ON_MESSAGE, topic, message, packet}));
        state.setAlert(['info', 'MQTT_CONNECT', mqttSetting.url]);
        connectTimeout = setTimeout(() => state.setAlert(['error', 'MQTT_CONNECT_TIMEOUT']), 5000)
        return {...state, mqtt:instance};
      } catch (error) {
        console.log(JSON.stringify(error))
        state.setAlert(['error', error])
        return state;
      }
    case ACTIONS.DISCONNECT:
      state.setAlert(['info', 'MQTT_DISCONNECT']);
      if(state.mqtt && state.mqtt.connected) state.mqtt.end();
      state.dispatch({type: ACTIONS.UNSUBSCRIBED});
      return state;
    case ACTIONS.SUBSCRIBE:
      if(!state.subscribedTo.topic){
        state.setAlert(['info', 'MQTT_SUBSCRIBE', state.subscribedTo.topic]);
        const topic = {[action.setting.subscribeTo.topic]: {qos: action.setting.subscribeTo.qos}};
        state.mqtt.subscribe(topic, (error, granted) => {
          if(error){
            state.setAlert(['error', error]);
          }else if(granted[0].qos > 2){
            state.setAlert(['error', 'MQTT_SUBSCRIBE_FAIL', state.subscribedTo.topic]);
          }else{
            state.dispatch({type: ACTIONS.SUBSCRIBED, granted: {...granted[0], converter: action.setting.subscribeTo.converter}})
          }
        });
      }
      return state;
    case ACTIONS.SUBSCRIBED:
      state.clearAlert();
      return {...state, subscribedTo: action.granted};
    case ACTIONS.UNSUBSCRIBE:
      if(state.subscribedTo.topic){
        state.setAlert(['info', 'MQTT_UNSUBSCRIBE', state.subscribedTo.topic]);
        state.mqtt.unsubscribe(state.subscribedTo.topic, (error) => {
          if(error){
            state.setAlert(['error', error]);
          }else{
            state.dispatch({type: ACTIONS.UNSUBSCRIBED})
          }
        });
      }
      return state;
    case ACTIONS.UNSUBSCRIBED:
      state.clearAlert();
      return {...state, subscribedTo: {...state.subscribedTo, topic: '', qos: 0}};
    case ACTIONS.PUBLISH:
      state.mqtt.publish(
          action.setting.publishTo.topic, 
          action.setting.publishTo.message, 
          {qos: action.setting.publishTo.qos}, 
          (error) => {
            if(error){
              state.setAlert(['error', error]);
            }else{
              state.setAlert(['success', 'MQTT_PUBLISHED']);
              state.clearAlert(1000);
            }
      })
      return state;
    case ACTIONS.ON_ERROR:
      console.log(action.error);
      return {...state, error: action.error};
    case ACTIONS.UPDATE_STATUS:
    case ACTIONS.ON_CONNECT:
      clearTimeout(connectTimeout);
      setAlertTimeout(state, ['info', 'MQTT_ON_CONNECT']);
      return {...state, status: action.status};
    case ACTIONS.ON_CLOSE:
      setAlertTimeout(state, ['warning', 'MQTT_ON_CLOSE']);
      return {...state, status: action.status};
    case ACTIONS.ON_RECONNECT:
      setAlertTimeout(state, ['warning', 'MQTT_ON_RECONNECT']);
      return {...state, status: action.status};
    case ACTIONS.ON_OFFLINE:
      setAlertTimeout(state, ['warning', 'MQTT_ON_OFFLINE']);
      return {...state, status: action.status};
    case ACTIONS.TOGGLE_PAUSE:
      setAlertTimeout(state, state.pause ? ['success', 'MQTT_PLAY'] : ['info', 'MQTT_PAUSE']);
      return {...state, pause: !state.pause};
    default:
      return state;
  }
}
export default function MqttProvider({ children }){
  const [, setAlert, clearAlert] = React.useContext(AlertContext);
  
  
  const [state, dispatch] = React.useReducer(mqttReducer, {
    dispatch: null,
    updateInterval: 100,
    mqtt: null,
    status: 'offline',
    subscribedTo: {topic: '', qos: 0},
    messages: [],
    messagesCount: 0,
    setAlert,
    clearAlert,
    pause: false
  })
  
  React.useEffect(() => {
    dispatch({type: ACTIONS.INIT, dispatch});
    return () => {
      if(mqtt && mqtt.connected) state.mqtt.end();
    }
  }, [state.mqtt])
  return (
      <MqttContext.Provider value={[state, dispatch]}>{children}</MqttContext.Provider>
  )
}