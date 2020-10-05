import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InputIcon from '@material-ui/icons/Input';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SettingsIcon from '@material-ui/icons/Settings';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import PublishIcon from '@material-ui/icons/Publish';
import HistoryIcon from '@material-ui/icons/History';
import { MqttSettingContext,  MqttContext} from 'hooks/context/Contexts';

import 'components/ConfigActions.css';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  configActionsWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
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

export default function ConfigActions(props) {
  const {
      hidden,
      onConnectClick,
      onSubscribeClick,
      onPublishClick,
      onClick
  } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
//   const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
  const [mqttState, dispatch] = React.useContext(MqttContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConnect = () => {
    handleClose();
    // onConnectClick(true);
    onClick('connect')
  }

  const handleDisconnect = () =>{
    if(mqttState.status === 'connected') dispatch({type: 'disconnect', dispatch});
  }

  const handleUnsubscribe = () =>{
    if(mqttState.subscribedTo.topic) dispatch({type: 'unsubscribe', dispatch});
  }

  const handleSubscribe = () => {
    if(true || mqttState.status === 'connected'){
        handleClose();
        // onSubscribeClick(true);
        onClick('subscribe')
    }
  }

  const handlePublish = () => {
    if(true || mqttState.status === 'connected'){
        handleClose();
        // onPublishClick(true);
        onClick('publish')
    }
  }

  const actions = [
    { 
        icon: <InputIcon />, 
        name: 'Connect', 
        handler: handleConnect, 
        open: true
    },
    { 
        icon: <CancelPresentationIcon />, 
        name: 'Disconnect', 
        handler: handleDisconnect, 
        open: mqttState.status === 'connected'// ? true : false 
    },
    { 
        icon: <AddToQueueIcon />, 
        name: 'Subscribe', 
        handler: handleSubscribe,
        open: mqttState.status === 'connected'// ? true : false 
    },
    { 
        icon: <RemoveFromQueueIcon />, 
        name: 'Unsubscribe',
        handler: handleUnsubscribe,
        open: mqttState.subscribedTo.topic ? true : false 
    },
    { 
        icon: <PublishIcon />, 
        name: 'Publish' ,
        handler: handlePublish,
        open: mqttState.status === 'connected'// ? true : false 
    },
    { 
        icon: <HistoryIcon />, 
        name: 'History',
        open: mqttState.messages.length
    },
  ];

  return (
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={`${classes.speedDial} ConfigActions ${hidden ? 'ConfigActions-hide' : ''}`}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          // icon={<SpeedDialIcon openIcon={<SettingsIcon />}/>}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
        >
          {actions.map((action) => {
            if(action.open) return(
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.handler}
                tooltipOpen={action.open}
              />
            )
          })}
        </SpeedDial>
  );
}
