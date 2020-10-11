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
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AppSettingContext, MqttSettingContext, MqttContext} from 'hooks/context/Contexts';
import { KeyboardDateTimePicker, DateTimePicker } from '@material-ui/pickers';
import { columns, collpasedColumns } from 'lib/converter/MessageConverter';


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
  filterControl: {
    flexDirection: 'row',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  formControl: {
    minWidth: '180px',
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
  const [appSetting, setAppSetting] = React.useContext(AppSettingContext);
  const [mqttState, dispatch] = React.useContext(MqttContext);
  const theme = useTheme();
  const keys = {...(columns[mqttSetting.subscribeTo.converter] ? columns[mqttSetting.subscribeTo.converter] : columns['default']), ...collpasedColumns[mqttSetting.subscribeTo.converter]};

  const handleTimeChange = (key) => (value) => {
    // console.log(key)
    // console.log(value)
    const timeRange = [...appSetting.filter.time];
    switch(key){
      case 0:
        if(value && appSetting.filter.time[1] && value.isAfter(appSetting.filter.time[1])){
          return;
        }
        // setStartTime(value);
        if(value) value.set({second:0,millisecond:0})
        timeRange[0] = value;
        setAppSetting({...appSetting, filter: {...appSetting.filter, time: timeRange}});
        break;
      case 1:
        if(value && appSetting.filter.time[0] && value.isBefore(appSetting.filter.time[0])){
          return;
        }
        // setEndTime(value);
        // const timeRange = [...appSetting.filter.time];
        if(value) value.set({second:59,millisecond:999})
        timeRange[1] = value;
        setAppSetting({...appSetting, filter: {...appSetting.filter, time: timeRange}});
        break;
    }
  }

  const handleTextChange = (key) => (event, value) => {
    // console.log(key)
    // console.log(value)
    const textFilter = [...appSetting.filter.text];
    switch(key){
      case 0:
        textFilter[0] = event.target.value;
        setAppSetting({...appSetting, filter: {...appSetting.filter, text: textFilter}});
        break;
      case 1:
        textFilter[1] = event.target.value;
        setAppSetting({...appSetting, filter: {...appSetting.filter, text: textFilter}});
        break;
    }
  }
  const handleClose = () => {
    onChange(false);
  };

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
            value={appSetting.locale}
            disableClearable
            onChange={(event, newValue) => {
              setAppSetting({...appSetting, locale: newValue});
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
          <FormGroup className={`${classes.filterControl}`}>
            <DateTimePicker 
              label="Start Time"
              value={appSetting.filter.time[0]} 
              onChange={handleTimeChange(0)} 
              error={false}
              clearable
            />
            <DateTimePicker 
              label="End Time"
              value={appSetting.filter.time[1]} 
              onChange={handleTimeChange(1)} 
              error={false}
              clearable
            />
          </FormGroup>
          <FormGroup className={`${classes.filterControl}`}>
            <FormControl className={classes.formControl}>
              <InputLabel id="filter-key-select-label">Filter Key</InputLabel>
              <Select
                labelId="filter-key-select-label"
                id="filter-key-select"
                value={appSetting.filter.text[0]}
                onChange={handleTextChange(0)}
              >
                {Object.entries(keys).map(([key, column]) => (
                  <MenuItem key={key} value={key}>{column}</MenuItem>
                ))}
                {/* <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
            <TextField 
              fullWidth 
              id="filter-text" 
              label="Filter Text" 
              onChange={handleTextChange(1)}
              value={appSetting.filter.text[1]}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {/* <Button onClick={handlePublish} color="primary" disabled={!mqttState.mqtt?.connected || !mqttSetting.publishTo.topic || !mqttSetting.publishTo.message}>
            Publish
          </Button> */}
        </DialogActions>
      </Dialog>
  );
}
