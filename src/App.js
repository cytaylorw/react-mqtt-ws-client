import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import NavBar from 'components/NavBar';
import MessageTable from 'components/tables/MessageTable';
import ConfigActions from 'components/ConfigActions';
import AlertMessage from 'components/AlertMessage';
import DialogWrapper from 'components/dialogs/DialogWrapper';
import Container from '@material-ui/core/Container';

const useRowStyles = makeStyles((theme) => ({
  container: {
      paddingTop: theme.spacing(10),
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default 
  }
}));

function App() {
  const classes = useRowStyles();
  const [hideActionBtn, setHideActionBtn] = React.useState(false);
  const [openConnectDialog, setOpenConnectDialog] = React.useState(false);
  const [openSubscribeDialog, setOpenSubscribeDialog] = React.useState(false);
  const [openPublishDialog, setOpenPublishDialog] = React.useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = React.useState(false);

  const openDialogs = {
    connect: setOpenConnectDialog,
    subscribe: setOpenSubscribeDialog,
    publish: setOpenPublishDialog,
    settings: setOpenSettingsDialog
  }

  const setOpenDialog = (name) => {
    openDialogs[name](true);
  }
  
  return (
    <>
      <NavBar
        hidden={hideActionBtn}
        onChange={setHideActionBtn}
      />
      <Container maxWidth="xl" className={classes.container}>
        <MessageTable/>
      </Container>
      <ConfigActions
        hidden={hideActionBtn}
        onClick={setOpenDialog}
      />
      <AlertMessage/>
      <DialogWrapper 
        open={{openConnectDialog, openSubscribeDialog, openPublishDialog, openSettingsDialog}}
        openDialogs={openDialogs}
      />
    </>
  );
}

export default App;
