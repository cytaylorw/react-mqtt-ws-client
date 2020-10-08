import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
  slider: {
    width: '100px',
    marginLeft: theme.spacing(2),
  },
  textarea: {
    font: 'inherit',
    width: '100%',
    marginLeft: theme.spacing(2),
    boxSizing: 'border-box'
  },
  toText: {
    margin: 'auto'
  },
  timeControl: {
    flexDirection: 'row'
  }
}));

const defaultText = {
  localeLabel: 'Locale',
  startTimeLabel: 'Start Time',
  endTimeLabel: 'End Time',
  toLabel: 'To'
}

export default function AppSettingsDialog(props) {
  const classes = useStyles();
  const {open, onChange} = props;
  const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
  const [mqttState, dispatch] = React.useContext(MqttContext);
  const theme = useTheme();

  const handleClose = () => {
    onChange(false);
  };

  const handlePublish = () => {
    dispatch({type: 'publish', setting: mqttSetting});
  }

  const handlUnsubscribe = () =>{
    dispatch({type: 'unsubscribe'});
  }

  const handleTopicChange = (prop) => (event, value) => {
    // const index = prop == 'topic' ? 0 : prop = 'qos' ? 1 : -1;
    // if(index < 0) return;
    // let array = [...mqttSetting.topic];
    // array.splice(index, 1, typeof value === 'undefined' ? event.target.value : value);
    setMqttSetting({ 
      ...mqttSetting, 
      publishTo : {
        ...mqttSetting.publishTo, 
        [prop]: typeof value === 'undefined' ? event.target.value : value}
    });
  };

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

  return (
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="settings-dialog-title">
        <DialogTitle id="settings-dialog-title">Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Application settings for MQTT Websocket Client.
          </DialogContentText>
          <FormControl fullWidth className={classes.margin}>
          <Autocomplete
            options={theme.supportLocales}
            getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
            style={{ width: 300 }}
            value={mqttSetting.locale}
            disableClearable
            onChange={(event, newValue) => {
              setMqttSetting({...mqttSetting, locale: newValue});
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label={theme.i18n('AppSettingsDialog','localeLabel', defaultText)} 
                variant="outlined" 
                fullWidth 
              />
            )}
          />
          </FormControl>
          <Typography>Filter</Typography>
          <FormGroup fullWidth className={`${classes.margin} ${classes.timeControl}`}>
          <TextField
            id="startTime"
            label={theme.i18n('AppSettingsDialog','startTimeLabel', defaultText)} 
            type="datetime-local"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Typography className={classes.toText}>
            {theme.i18n('AppSettingsDialog','toLabel', defaultText)}
          </Typography>
          <TextField
            id="endTime"
            label={theme.i18n('AppSettingsDialog','endTimeLabel', defaultText)} 
            type="datetime-local"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handlePublish} color="primary" disabled={!mqttState.mqtt?.connected || !mqttSetting.publishTo.topic || !mqttSetting.publishTo.message}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>
  );
}
