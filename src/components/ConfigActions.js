import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import InputIcon from '@material-ui/icons/Input';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SettingsIcon from '@material-ui/icons/Settings';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import PublishIcon from '@material-ui/icons/Publish';
import { MqttContext } from 'hooks/context/Contexts';

import 'components/ConfigActions.css';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const defaultText = {
  connect: 'Connect',
  disconnect: 'Disconnect',
  subscribe: 'Subscribe',
  unsubscribe: 'Unsubscribe',
  publish: 'Publish',
  settings: 'Settings'
}

export default function ConfigActions(props) {
  const {
      hidden,
      onClick
  } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [mqttState, dispatch] = React.useContext(MqttContext);
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenDialog = (dialog) => () => {
    handleClose();
    onClick(dialog);
  }

  const handleDisconnect = () =>{
    if(mqttState.status === 'connected') dispatch({type: 'disconnect', dispatch});
  }

  const handleUnsubscribe = () =>{
    if(mqttState.subscribedTo.topic) dispatch({type: 'unsubscribe', dispatch});
  }

  const actions = [
    { 
        icon: <InputIcon />, 
        name: theme.i18n('ConfigActions','connect', defaultText),
        handler: handleOpenDialog('connect'), 
        open: true
    },
    { 
        icon: <CancelPresentationIcon />, 
        name: theme.i18n('ConfigActions','disconnect', defaultText), 
        handler: handleDisconnect, 
        open: mqttState.status === 'connected' && mqttState.mqtt.connected
    },
    { 
        icon: <AddToQueueIcon />, 
        name: theme.i18n('ConfigActions','subscribe', defaultText), 
        handler: handleOpenDialog('subscribe'),
        open: mqttState.status === 'connected' && mqttState.mqtt.connected
    },
    { 
        icon: <RemoveFromQueueIcon />, 
        name: theme.i18n('ConfigActions','unsubscribe', defaultText),
        handler: handleUnsubscribe,
        open: mqttState.subscribedTo.topic && mqttState.mqtt.connected
    },
    { 
        icon: <PublishIcon />, 
        name: theme.i18n('ConfigActions','publish', defaultText),
        handler: handleOpenDialog('publish'),
        open: mqttState.status === 'connected' && mqttState.mqtt.connected 
    },
    { 
        icon: <SettingsIcon />, 
        name: theme.i18n('ConfigActions','settings', defaultText),
        handler: handleOpenDialog('settings'),
        open: true
    },
  ];

  return (
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={`${classes.speedDial} ConfigActions ${hidden ? 'ConfigActions-hide' : ''}`}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
        >
          {actions.map((action) => 
            action.open ? (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.handler}
                tooltipOpen={action.open}
              />
            ) : null
          )}
        </SpeedDial>
  );
}
