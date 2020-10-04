import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { MqttSettingContext,  MqttContext} from 'hooks/context/Contexts';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));


export default function MqttConnectDialog(props) {
  const classes = useStyles();
  const {open, onChange} = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
  const [mqttState, dispatch] = React.useContext(MqttContext);

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
    onChange(false);
  };

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
    console.log(event.target.checked)
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
        label="Username"
        value={mqttSetting.username}
        onChange={handleChange('username')}
      />
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={mqttSetting.password}
          onChange={handleChange('password')}
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
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="connect-dialog-title">
        <DialogTitle id="connect-dialog-title">Connect to MQTT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Connect to a MQTT server over WebSocket.
          </DialogContentText>
          <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="standard-adornment-amount">URL</InputLabel>
            <Input
              id="standard-adornment-url"
              value={mqttSetting.url}
              onChange={handleChange('url')}
              startAdornment={<InputAdornment position="start">ws://</InputAdornment>}
            />
          </FormControl>
          <TextField 
            fullWidth 
            className={classes.margin} 
            id="mqtt-clientId" 
            label="Client ID"
            value={mqttSetting.clientId}
            onChange={handleChange('clientId')}
          />
          <FormControl fullWidth className={classes.margin}>
            <FormControlLabel
              control={
                <Switch
                  checked={mqttSetting.anomynous}
                  onChange={handleChange('anomynous')}
                  name="anomynous"
                  color="primary"
                />
              }
              label="Anomynous"
              // labelPlacement="start"
            />
          </FormControl>
          {mqttSetting.anomynous ? null : credentialInputs}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlDisconnect} color="primary">
            Disconnect
          </Button>
          <Button onClick={handleConnect} color="primary">
            Connect
          </Button>
        </DialogActions>
      </Dialog>
  );
}
