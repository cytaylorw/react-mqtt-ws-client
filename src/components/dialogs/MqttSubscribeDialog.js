import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import { MqttSettingContext, MqttContext, AlertContext} from 'hooks/context/Contexts';
import { types, messageConverter } from 'lib/converter/MessageConverter';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  slider: {
    width: '100px',
    marginLeft: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}));

const marks = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 1,
    label: '1'
  },
  {
    value: 2,
    label: '2'
  },
]

export default function MqttSubscribeDialog(props) {
  const classes = useStyles();
  const {open, onChange} = props;
  const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
  const [mqttState, dispatch] = React.useContext(MqttContext);
  const [, setAlert, ] = React.useContext(AlertContext);

  const handleClose = () => {
    onChange(false);
  };

  const handleSubscribe = () => {
    if(!messageConverter[mqttSetting.subscribeTo.converter]){
      setAlert(['error','Converter does not exist.']);
      return;
    }
    dispatch({type: 'subscribe', setting: mqttSetting});
  }

  const handlUnsubscribe = () =>{
    dispatch({type: 'unsubscribe'});
  }

  const handleTopicChange = (prop) => (event, value) => {
    setMqttSetting({ 
      ...mqttSetting, 
      subscribeTo : {
        ...mqttSetting.subscribeTo, 
        [prop]: typeof value === 'undefined' ? event.target.value : value}
    });
    if(prop === 'converter' && !messageConverter[value]) setAlert(['error', 'Selected converter does not exist.'])
  };



  return (
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="subscribe-dialog-title">
        <DialogTitle id="subscribe-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Subscribe to a MQTT topic.
          </DialogContentText>
          <TextField
            autoFocus
            id="topic"
            label="Topic"
            type="text"
            fullWidth
            className={classes.margin} 
            onChange={handleTopicChange('topic')}
            value={mqttSetting.subscribeTo.topic}
            error={!mqttSetting.subscribeTo.topic}
          />
          <FormControlLabel
            control={
              <Slider
                defaultValue={mqttSetting.subscribeTo.qos}
                min={0}
                max={2}
                step={1}
                marks={marks}
                valueLabelDisplay="off"
                className={classes.slider} 
                onChange={handleTopicChange('qos')}
              />
            }
            label="Qos"
            labelPlacement="start"
            className={classes.margin} 
          />
          <FormControl className={classes.formControl} error={!messageConverter[mqttSetting.subscribeTo.converter]}>
            <InputLabel htmlFor="age-native-simple">Converter</InputLabel>
            <Select
              native
              value={mqttSetting.subscribeTo.converter}
              onChange={handleTopicChange('converter')}
              inputProps={{
                name: 'converter',
                id: 'converter',
              }}
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </Select>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handlUnsubscribe} color="primary" disabled={!mqttState.subscribedTo.topic || !mqttState.mqtt.connected}>
            Unsubscribe
          </Button>
          <Button onClick={handleSubscribe} color="primary" disabled={!messageConverter[mqttSetting.subscribeTo.converter] || !mqttSetting.subscribeTo.topic}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
  );
}
