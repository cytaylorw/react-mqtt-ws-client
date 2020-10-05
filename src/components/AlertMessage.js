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
    // left: theme.spacing(2),
    // marginRight: theme.spacing(4),
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
  // const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useContext(AlertContext);
  // console.log(alert)
  const handleClose = () => {
    setAlert([])
  }

  return (
    <div className={classes.root}>
      {alert.length > 1 ? 
        <Alert severity={alert[0]} onClose={handleClose} className={classes.alert}>
          {typeof alert[1] === 'object' && alert[1] !== null && alert[1].message ? alert[1].message : JSON.stringify(alert[1])}
        </Alert>
      : null}
    </div>
  );
}