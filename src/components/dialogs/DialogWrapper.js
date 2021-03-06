import React from 'react'
import MqttConnectDialog from 'components/dialogs/MqttConnectDialog';
import MqttSubscribeDialog from 'components/dialogs/MqttSubscribeDialog';
import MqttPublishDialog from 'components/dialogs/MqttPublishDialog';
import AppSettingsDialog from 'components/dialogs/AppSettingsDialog';

export default function DialogWrapper(props) {
    const {
        open,
        openDialogs
    } = props;
    return (
        <>
            <MqttConnectDialog 
                open={open.openConnectDialog}
                onChange={openDialogs.connect}
            />
            <MqttSubscribeDialog 
                open={open.openSubscribeDialog}
                onChange={openDialogs.subscribe}
            />
            <MqttPublishDialog 
                open={open.openPublishDialog}
                onChange={openDialogs.publish}
            />
            <AppSettingsDialog 
                open={open.openSettingsDialog}
                onChange={openDialogs.settings}
            />
        </>
    )
}
