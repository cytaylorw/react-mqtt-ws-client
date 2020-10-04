import React from 'react'
import MqttConnectDialog from 'components/dialogs/MqttConnectDialog';
import MqttSubscribeDialog from 'components/dialogs/MqttSubscribeDialog';

export default function DialogWrapper(props) {
    const {
        open,
        onChange
    } = props;
    return (
        <>
            <MqttConnectDialog 
                open={open.openConnectDialog}
                onChange={onChange.setOpenConnectDialog}
            />
            <MqttSubscribeDialog 
                open={open.openSubscribeDialog}
                onChange={onChange.setOpenSubscribeDialog}
            />
        </>
    )
}
