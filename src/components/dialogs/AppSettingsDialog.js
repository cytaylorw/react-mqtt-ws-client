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
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AppSettingContext, MqttSettingContext } from 'hooks/context/Contexts';
import { DateTimePicker } from '@material-ui/pickers';
import { columns, collpasedColumns } from 'lib/converter/MessageConverter';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
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
  toLabel: 'To',
  langauges: {
    enUS: 'English',
    zhTW: '繁體中文'
  }
}


export default function AppSettingsDialog(props) {
  const classes = useStyles();
  const {open, onChange} = props;
  const [mqttSetting, ] = React.useContext(MqttSettingContext);
  const [appSetting, setAppSetting] = React.useContext(AppSettingContext);
  const theme = useTheme();
  const keys = {...(columns[mqttSetting.subscribeTo.converter] ? columns[mqttSetting.subscribeTo.converter] : columns['default']), ...collpasedColumns[mqttSetting.subscribeTo.converter]};

  const handleTimeChange = (key) => (value) => {
    const timeRange = [...appSetting.filter.time];
    switch(key){
      case 0:
        if(value && appSetting.filter.time[1] && value.isAfter(appSetting.filter.time[1])){
          return;
        }
        if(value) value.set({second:0,millisecond:0})
        timeRange[0] = value;
        setAppSetting({...appSetting, filter: {...appSetting.filter, time: timeRange}});
        break;
      case 1:
        if(value && appSetting.filter.time[0] && value.isBefore(appSetting.filter.time[0])){
          return;
        }
        if(value) value.set({second:59,millisecond:999})
        timeRange[1] = value;
        setAppSetting({...appSetting, filter: {...appSetting.filter, time: timeRange}});
        break;
      default:
        console.log(key);
    }
  }

  const handleTextChange = (key) => (event, value) => {
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
      default:
        console.log(key);
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
            getOptionLabel={
              (key) => defaultText.langauges[key] ? 
                defaultText.langauges[key] : 
                `${key.substring(0, 2)}-${key.substring(2, 4)}`
            }
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
        </DialogActions>
      </Dialog>
  );
}
