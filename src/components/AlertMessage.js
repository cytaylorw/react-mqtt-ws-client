import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { AlertContext } from 'hooks/context/Contexts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    top: theme.spacing(10),
    zIndex: 99999,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  alert: {
    boxShadow: theme.shadows[8]
  }
}));

export default function AlertMessage() {
  const classes = useStyles();
  const [alert, , clearAlert] = React.useContext(AlertContext);
  const handleClose = () => {
    clearAlert()
  }

  return (
    <div className={classes.root}>
      {alert.length > 1 ? 
        <Alert severity={alert[0]} onClose={handleClose} className={classes.alert}>
          {alert[1]?.message ?? alert[1]}
        </Alert>
      : null}
    </div>
  );
}