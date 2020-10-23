import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { MqttSettingContext,  MqttContext} from 'hooks/context/Contexts';

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    chipMargin: {
        marginLeft: theme.spacing(0.5),
    },
    successBg: {
        backgroundColor: theme.palette.success[theme.palette.type],
        color: theme.palette.success.contrastText
    },
    errorBg: {
        backgroundColor: theme.palette.error[theme.palette.type],
        color: theme.palette.error.contrastText
    },
    warningBg: {
        backgroundColor: theme.palette.warning[theme.palette.type],
        color: theme.palette.warning.contrastText
    },
    infoBg: {
        backgroundColor: theme.palette.info[theme.palette.type],
        color: theme.palette.info.contrastText
    },
}));

const defaultText = {
    connected: 'CONNECTED',
    reconnecting: 'RECONNECTING',
    closed: 'CLOSED',
    offline: 'OFFLINE'
}

export default function MqttStatus() {
    const [mqttSetting, ] = React.useContext(MqttSettingContext);
    const [mqttState, ] = React.useContext(MqttContext);
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Box>
            <Chip 
                label={theme.i18n('MqttStatus',mqttState.status, defaultText)}
                className={`
                    ${classes.chipMargin} 
                    ${mqttState.status === 'connected' ? 
                        classes.successBg : 
                        mqttState.status === 'reconnecting' ?
                            classes.warningBg :
                            classes.errorBg 
                }`} 
                
            />
            {
                mqttState.status === 'connected' ? 
                    <Chip 
                        label={mqttSetting.url} 
                        className={`${classes.chipMargin} ${classes.infoBg}`}
                    /> :
                    null
            }
            {
                mqttState.subscribedTo.topic ? 
                    <Chip 
                        avatar={<Avatar className={classes.successBg}>{mqttState.subscribedTo.qos}</Avatar>} 
                        label={mqttState.subscribedTo.topic} 
                        className={`${classes.chipMargin} ${classes.infoBg}`}
                    /> :
                    null
            }
        </Box>
    )
}
