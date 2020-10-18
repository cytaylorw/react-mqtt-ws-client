import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { MqttSettingContext,  MqttContext} from 'hooks/context/Contexts';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
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

export default function MqttPublishDialog(props) {
  const classes = useStyles();
  const {open, onChange} = props;
  const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
  const [mqttState, dispatch] = React.useContext(MqttContext);

  const handleClose = () => {
    onChange(false);
  };

  const handlePublish = () => {
    dispatch({type: 'publish', setting: mqttSetting});
  }

  const handleTopicChange = (prop) => (event, value) => {
    setMqttSetting({ 
      ...mqttSetting, 
      publishTo : {
        ...mqttSetting.publishTo, 
        [prop]: typeof value === 'undefined' ? event.target.value : value}
    });
  };

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
