import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { MqttSettingContext,  MqttContext} from 'hooks/context/Contexts';
import ConfigDialog from 'components/dialogs/ConfigDialog';
import QosSlider from 'components/inputs/QosSlider';
import TopicTextField from 'components/inputs/TopicTextField';

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

const defaultText = {
  publishBtn: 'Publish',
  title: 'Publish',
  contentText: 'Publish a MQTT message.',
  messageLabel: 'Message',
  messagePlaceholder: 'Enter a MQTT message'
}

export default function MqttPublishDialog(props) {
  const theme = useTheme();
  const classes = useStyles();
  const {open, onChange} = props;
  const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
  const [mqttState, dispatch] = React.useContext(MqttContext);

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
    <ConfigDialog
      open={open}
      onChange={onChange}
      title={theme.i18n('MqttPublishDialog','title', defaultText)}
      contentText={theme.i18n('MqttPublishDialog','contentText', defaultText)}
      content={(
        <>
          <TopicTextField
            onChange={handleTopicChange('topic')}
            value={mqttSetting.publishTo.topic}
            error={!mqttSetting.publishTo.topic}
          />
          <QosSlider
            value={mqttSetting.publishTo.qos}
            onChange={handleTopicChange('qos')}
          />
          <InputLabel className={classes.margin}  error={!mqttSetting.publishTo.message}>{theme.i18n('MqttPublishDialog','messageLabel', defaultText)}</InputLabel>
          <TextareaAutosize 
            error="true"
            aria-label="message" 
            placeholder={theme.i18n('MqttPublishDialog','messagePlaceholder', defaultText)} 
            rowsMin="3" 
            className={classes.textarea}  
            onChange={handleTopicChange('message')}
            value={mqttSetting.publishTo.message}
          />
        </>
      )}
      buttons={(
        <>
          <Button 
            onClick={handlePublish} 
            color="primary" 
            disabled={!mqttState.mqtt?.connected || !mqttSetting.publishTo.topic || !mqttSetting.publishTo.message}
            variant={theme.palette.type === 'dark' ? 'contained' : 'text'}
          >
            {theme.i18n('MqttPublishDialog','publishBtn', defaultText)}
          </Button>
        </>
      )}
    />
  );
}
