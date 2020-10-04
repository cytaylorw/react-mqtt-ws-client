import React from 'react';
import mqtt from 'mqtt';
import MqttSettingProvider from 'hooks/context/MqttSettingProvider';
import { MqttSettingContext,  MqttContext} from 'hooks/context/Contexts';

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
  UPDATE_MESSAGES: 'updateMessages'
}

let messageBuffer = [{messages: []}];
let timeoutHandle = null;

const mqttReducer = (state, action) => {
  switch(action.type){
    case ACTIONS.ON_MESSAGE:
      let last = messageBuffer.length - 1;
      messageBuffer[last].messages.push({
        topic: action.topic, 
        message: action.message.toString(), 
        qos: action.packet.qos, 
        retain: action.packet.retain, 
        dup: action.packet.dup, 
        time: Date.now()
      }) 
      if(!timeoutHandle){
        timeoutHandle = setTimeout(() => state.dispatch({type: ACTIONS.UPDATE_MESSAGES}), state.updateInterval)
      }
      return state;
    case ACTIONS.UPDATE_MESSAGES:
      messageBuffer.push({messages: []});
      timeoutHandle = null;
      let newMessages = messageBuffer[0].messages;
      messageBuffer.shift();
      return {
        ...state,
        messages: [...state.messages, ...newMessages],
        messagesCount: state.messagesCount+newMessages.length
      };
    case ACTIONS.SUBSCRIBE:
      if(!state.subscribedTo.topic){
        const topic = {[action.setting.subscribeTo.topic]: {qos: action.setting.subscribeTo.qos}};
        state.mqtt.subscribe(topic, (error, granted) => {
          if(!error && granted[0].qos <= 2) state.dispatch({type: ACTIONS.SUBSCRIBED, granted: granted[0]})
        });
      }
      return state;
    case ACTIONS.SUBSCRIBED:
      // console.log(action.type);
      return {...state, subscribedTo: action.granted};
    case ACTIONS.INIT:
      return {...state, dispatch: action.dispatch};
    case ACTIONS.CONNECT:
      // console.log(state.mqtt)
      if(state.mqtt && state.mqtt.connected) state.mqtt.end();
      const mqttSetting = action.setting;
      const brokerUrl = 'ws://' + mqttSetting.url;
      const instance = mqtt.connect(brokerUrl, {
        ...mqttSetting,
        username: mqttSetting.anonymous ? undefined : mqttSetting.username,
        password: mqttSetting.anonymous ? undefined : mqttSetting.password,
        reconnectPeriod: 0
      });
      instance.on('connect', () => state.dispatch({type: ACTIONS.ON_CONNECT, status: 'connected'}));
      instance.on('reconnect', () => state.dispatch({type: ACTIONS.ON_RECONNECT, status: 'reconnecting'}));
      instance.on('close', () => state.dispatch({type: ACTIONS.ON_CLOSE, status: 'closed'}));
      instance.on('offline', () => state.dispatch({type: ACTIONS.ON_OFFLINE, status: 'offline'}));
      instance.on('error', (error) => state.dispatch({type: ACTIONS.ON_ERROR, error}));
      instance.on('message', (topic, message, packet) => state.dispatch({type: ACTIONS.ON_MESSAGE, topic, message, packet, dispatch: action.dispatch}));
      return {...state, mqtt:instance};
    case ACTIONS.DISCONNECT:
      if(state.mqtt && state.mqtt.connected) state.mqtt.end();
      state.dispatch({type: ACTIONS.UNSUBSCRIBED});
      return state;
    case ACTIONS.UNSUBSCRIBE:
      if(state.subscribedTo.topic){
        state.mqtt.unsubscribe(state.subscribedTo.topic, (error) => {
          if(!error) state.dispatch({type: ACTIONS.UNSUBSCRIBED});
        });
      }
      return state;
    case ACTIONS.UNSUBSCRIBED:
      // clearTimeout(timeoutHandle);
      // state.dispatch({type: ACTIONS.UPDATE_MESSAGES});
      return {...state, subscribedTo: {topic: '', qos: 0}};
    case ACTIONS.ON_ERROR:
      console.log(action.error);
      return {...state, error: action.error};
    case ACTIONS.UPDATE_STATUS:
    case ACTIONS.ON_CONNECT:
    case ACTIONS.ON_RECONNECT:
    case ACTIONS.ON_CLOSE:
    case ACTIONS.ON_OFFLINE:
      // console.log(action.type)
      // console.log(state.mqtt)
      return {...state, status: action.status};
    default:
      return state;
  }
}
export default function MqttProvider({ children }){
  // const [mqttInstance, setMqttInstance] = React.useState(null);
  // const [status, setStatus] = React.useState('offline');
  
  
  const [state, dispatch] = React.useReducer(mqttReducer, {
    dispatch: null,
    updateInterval: 100,
    mqtt: null,
    status: 'offline',
    subscribedTo: {topic: '', qos: 0},
    messages: [],
    messagesCount: 0
  })
  
  React.useEffect(() => {
    dispatch({type: ACTIONS.INIT, dispatch});
    return () => {
      if(mqtt && mqtt.connected) state.mqtt.end();
    }
  }, [mqtt])
  return (
      <MqttContext.Provider value={[state, dispatch]}>{children}</MqttContext.Provider>
  )
}