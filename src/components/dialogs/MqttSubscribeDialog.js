import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
  }
}));

export default function MqttLoginDialog(props) {
  const classes = useStyles();
  const {open, onChange} = props;
//   const [open, setOpen] = React.useState(false);
  const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
  const [mqttState, dispatch] = React.useContext(MqttContext);
  // console.log(mqttSetting)
  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
    onChange(false);
  };

  const handleSubscribe = () => {
    dispatch({type: 'subscribe', setting: mqttSetting, dispatch});
  }

  const handlUnsubscribe = () =>{
    dispatch({type: 'unsubscribe', dispatch});
  }

  const handleTopicChange = (prop) => (event, value) => {
    // const index = prop == 'topic' ? 0 : prop = 'qos' ? 1 : -1;
    // if(index < 0) return;
    // let array = [...mqttSetting.topic];
    // array.splice(index, 1, typeof value === 'undefined' ? event.target.value : value);
    setMqttSetting({ 
      ...mqttSetting, 
      subscribeTo : {
        ...mqttSetting.subscribeTo, 
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
          />
            <FormControlLabel
              control={
                <Slider
                  defaultValue={mqttSetting.subscribeTo.qos}
                  min={0}
                  max={2}
                  // getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider-always"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlUnsubscribe} color="primary">
            Unsubscribe
          </Button>
          <Button onClick={handleSubscribe} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
  );
}
