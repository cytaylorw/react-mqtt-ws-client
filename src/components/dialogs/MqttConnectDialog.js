import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { MqttSettingContext,  MqttContext} from 'hooks/context/Contexts';
import ConfigDialog from 'components/dialogs/ConfigDialog';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const defaultText = {
  connectBtn: 'Connect',
  disconnectBtn: 'Disconnect',
  title: 'Connect to MQTT',
  contentText: 'Connect to a MQTT server over WebSocket.',
  urlLabel: 'URL',
  clientIdLabel: 'Client ID',
  anomynousLabel: 'Anomynous',
  basicAuthLabel: 'Basic Authentication',
  usernameLabel: 'Username',
  passwordLabel: 'Password'
}

export default function MqttConnectDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {open, onChange} = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
  const [mqttState, dispatch] = React.useContext(MqttContext);

  const connectDisabled = mqttState.mqtt?.connected || !mqttSetting.url || !mqttSetting.clientId || 
    (!mqttSetting.anomynous && (!mqttSetting.username || !mqttSetting.password));

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleConnect = () => {
    dispatch({type: 'connect', setting: mqttSetting});
  }

  const handlDisconnect = () =>{
    dispatch({type: 'disconnect'});
  }

  const handleChange = (prop) => (event) => {
    setMqttSetting({ 
      ...mqttSetting, 
      [prop]: event.target.type === 'checkbox' ? event.target.checked : event.target.value 
    });
  };

  const credentialInputs = (
    <>
      <TextField 
        fullWidth 
        className={classes.margin} 
        id="mqtt-username" 
        label={theme.i18n('MqttConnectDialog','usernameLabel', defaultText)}
        value={mqttSetting.username}
        onChange={handleChange('username')}
        error={!mqttSetting.username}
      />
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-password" error={!mqttSetting.password}>
          {theme.i18n('MqttConnectDialog','passwordLabel', defaultText)}
        </InputLabel>
        <Input
          id="mqtt-password"
          type={showPassword ? 'text' : 'password'}
          value={mqttSetting.password}
          onChange={handleChange('password')}
          error={!mqttSetting.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  )

  return (
    <ConfigDialog
      open={open}
      onChange={onChange}
      title={theme.i18n('MqttConnectDialog','title', defaultText)}
      contentText={theme.i18n('MqttConnectDialog','contentText', defaultText)}
      content={(
        <>
          <FormControl fullWidth className={classes.margin} error={!mqttSetting.url}>
            <InputLabel htmlFor="standard-adornment-amount">{theme.i18n('MqttConnectDialog','urlLabel', defaultText)}</InputLabel>
            <Input
              id="standard-adornment-url"
              value={mqttSetting.url}
              onChange={handleChange('url')}
              // startAdornment={<InputAdornment position="start">ws://</InputAdornment>}
            />
          </FormControl>
          <TextField 
            fullWidth 
            className={classes.margin} 
            id="mqtt-clientId" 
            label={theme.i18n('MqttConnectDialog','clientIdLabel', defaultText)}
            value={mqttSetting.clientId}
            onChange={handleChange('clientId')}
            error={!mqttSetting.clientId}
          />
          <FormControl fullWidth className={classes.margin}>
            <FormControlLabel
              control={
                <Switch
                  checked={mqttSetting.anomynous}
                  onChange={handleChange('anomynous')}
                  name="anomynous"
                  color="secondary"
                />
              }
              label={theme.i18n('MqttConnectDialog',mqttSetting.anomynous ? 'anomynousLabel' : 'basicAuthLabel', defaultText)}
              // labelPlacement="start"
            />
          </FormControl>
          {mqttSetting.anomynous ? null : credentialInputs}
        </>
      )}
      buttons={(
        <>
          <Button 
            onClick={handleConnect} 
            color="primary" 
            disabled={connectDisabled}
            variant={theme.palette.type === 'dark' ? 'contained' : 'text'}
          >
            {theme.i18n('MqttConnectDialog','connectBtn', defaultText)}
          </Button>
          <Button 
            onClick={handlDisconnect} 
            color="primary" 
            disabled={mqttState.status !== 'connected' || !mqttState.mqtt?.connected}
            variant={theme.palette.type === 'dark' ? 'contained' : 'text'}
          >
            {theme.i18n('MqttConnectDialog','disconnectBtn', defaultText)}
          </Button>
        </>
      )}
    />
  );
}
