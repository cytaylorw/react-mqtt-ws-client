import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  slider: {
    width: '100px',
    marginLeft: theme.spacing(2),
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

const defaultText = {
  qosLabel: 'QoS',
}

export default function QosSlider(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { value, onChange} = props;
  return (
          <FormControlLabel
            control={
              <Slider
                value={value}
                min={0}
                max={2}
                step={1}
                marks={marks}
                valueLabelDisplay="off"
                className={classes.slider} 
                onChange={onChange}
              />
            }
            label={theme.i18n('QosSlider','qosLabel', defaultText)}
            labelPlacement="start"
            className={classes.margin} 
          />
  );
}
