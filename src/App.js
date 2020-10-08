import React from 'react';
import './App.css';
import NavBar from 'components/NavBar';
import MessageTable from 'components/tables/MessageTable';
import ConfigActions from 'components/ConfigActions';
import AlertMessage from 'components/AlertMessage';
import DialogWrapper from 'components/dialogs/DialogWrapper';

function App() {
  const [hideActionBtn, setHideActionBtn] = React.useState(false);
  const [openConnectDialog, setOpenConnectDialog] = React.useState(false);
  const [openSubscribeDialog, setOpenSubscribeDialog] = React.useState(false);
  const [openPublishDialog, setOpenPublishDialog] = React.useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = React.useState(true);

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
      <MessageTable></MessageTable>
      <ConfigActions
        hidden={hideActionBtn}
        onClick={setOpenDialog}
      />
      <AlertMessage></AlertMessage>
      <DialogWrapper 
        open={{openConnectDialog, openSubscribeDialog, openPublishDialog, openSettingsDialog}}
        openDialogs={openDialogs}
      />
    </>
  );
}

export default App;
