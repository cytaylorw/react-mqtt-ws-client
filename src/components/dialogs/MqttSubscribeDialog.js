import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ConfigDialog from 'components/dialogs/ConfigDialog';
import QosSlider from 'components/inputs/QosSlider';
import TopicTextField from 'components/inputs/TopicTextField';
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

const defaultText = {
  subscribeBtn: 'Subscribe',
  unsubscribeBtn: 'Unsubscribe',
  title: 'Subscribe',
  contentText: 'Subscribe to a MQTT topic.',
  converterLabel: 'Converter',
}

export default function MqttSubscribeDialog(props) {
  const theme = useTheme();
  const classes = useStyles();
  const {open, onChange} = props;
  const [mqttSetting, setMqttSetting] = React.useContext(MqttSettingContext);
  const [mqttState, dispatch] = React.useContext(MqttContext);
  const [, setAlert, ] = React.useContext(AlertContext);

  const handleSubscribe = () => {
    if(!messageConverter[mqttSetting.subscribeTo.converter]){
      setAlert(['error','CONVERTER_INVALID']);
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
    if(prop === 'converter' && !messageConverter[event.target.value]) setAlert(['error', 'CONVERTER_INVALID'])
  };



  return (
    <ConfigDialog
      open={open}
      onChange={onChange}
      title={theme.i18n('MqttSubscribeDialog','title', defaultText)}
      contentText={theme.i18n('MqttSubscribeDialog','contentText', defaultText)}
      content={(
        <>
          <TopicTextField
            onChange={handleTopicChange('topic')}
            value={mqttSetting.subscribeTo.topic}
            error={!mqttSetting.subscribeTo.topic}
          />
          <QosSlider
            value={mqttSetting.subscribeTo.qos}
            onChange={handleTopicChange('qos')}
          />
          <FormControl className={classes.formControl} error={!messageConverter[mqttSetting.subscribeTo.converter]}>
            <InputLabel htmlFor="age-native-simple">{theme.i18n('MqttSubscribeDialog','converterLabel', defaultText)}</InputLabel>
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
        </>
      )}
      buttons={(
        <>
          <Button 
            onClick={handleSubscribe} 
            color="primary" 
            disabled={!messageConverter[mqttSetting.subscribeTo.converter] || !mqttSetting.subscribeTo.topic || Boolean(mqttState.subscribedTo.topic && mqttState.mqtt.connected)}
            variant={theme.palette.type === 'dark' ? 'contained' : 'text'}
          >
            {theme.i18n('MqttSubscribeDialog','subscribeBtn', defaultText)}
          </Button>
          <Button 
            onClick={handlUnsubscribe} 
            color="primary" 
            disabled={!mqttState.subscribedTo.topic || !mqttState.mqtt.connected}
            variant={theme.palette.type === 'dark' ? 'contained' : 'text'}
          >
            {theme.i18n('MqttSubscribeDialog','unsubscribeBtn', defaultText)}
          </Button>
        </>
      )}
    />
  );
}
