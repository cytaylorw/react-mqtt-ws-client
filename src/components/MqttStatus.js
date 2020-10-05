import React from 'react'
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { MqttSettingContext,  MqttContext} from 'hooks/context/Contexts';

export default function MqttStatus() {
    const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
    const [mqttState, dispatch] = React.useContext(MqttContext);
    // const [mqttInstance, setMqttInstance] = mqttState.mqtt;
    // const [status, setStatus] = mqttState.status;
    return (
        <Box>
            <Chip label={`${mqttState.status.toUpperCase()}${mqttState.status === 'connected' ? ` to ${mqttSetting.url}` : ''}`} />
            {/* <Chip label={`${mqttState.messagesCount} message(s)`} /> */}
            {
                mqttState.subscribedTo.topic ? 
                    <Chip avatar={<Avatar>{mqttState.subscribedTo.qos}</Avatar>} label={mqttState.subscribedTo.topic} /> :
                    null
            }
        </Box>
    )
}
