import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const defaultText = {
  topicLabel: 'Topic',
}

export default function TopicTextField(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { value, error, onChange } = props;

  return (
          <TextField
            autoFocus
            id="topic"
            label={theme.i18n('TopicTextField','topicLabel', defaultText)}
            type="text"
            fullWidth
            className={classes.margin} 
            onChange={onChange}
            value={value}
            error={error}
          />

  );
}
