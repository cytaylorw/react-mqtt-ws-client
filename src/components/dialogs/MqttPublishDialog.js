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
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
  }
}));

export default function MqttPublishDialog(props) {
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

  const handlePublish = () => {
    // if(!mqttSetting.publishTo.topic || !mqttSetting.publishTo.message){
    //   return;
    // }
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
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="publish-dialog-title">
        <DialogTitle id="publish-dialog-title">Publish</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Publish to a MQTT topic.
          </DialogContentText>
          <TextField
            error={!mqttSetting.publishTo.topic}
            autoFocus
            id="topic"
            label="Topic"
            type="text"
            fullWidth
            className={classes.margin} 
            onChange={handleTopicChange('topic')}
            value={mqttSetting.publishTo.topic}
          />
          <FormControlLabel
            control={
              <Slider
                defaultValue={mqttSetting.publishTo.qos}
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
          <InputLabel className={classes.margin}  error={!mqttSetting.publishTo.message}>Message</InputLabel>
          <TextareaAutosize 
            error="true"
            aria-label="message" 
            placeholder="Message" 
            rowsMin="3" 
            className={classes.textarea}  
            onChange={handleTopicChange('message')}
            value={mqttSetting.publishTo.message}
          />
          {/* <FormControlLabel
            control={
            }
            label="Message"
            labelPlacement="start"
            className={classes.margin} 
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePublish} color="primary" disabled={!mqttState.mqtt?.connected || !mqttSetting.publishTo.topic || !mqttSetting.publishTo.message}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>
  );
}
