import React from 'react';
import './App.css';
import NavBar from 'components/NavBar';
import MessageTable from 'components/tables/MessageTable';
import ConfigActions from 'components/ConfigActions';
import DialogWrapper from 'components/dialogs/DialogWrapper';

function App() {
  const [hideActionBtn, setHideActionBtn] = React.useState(false);
  const [openConnectDialog, setOpenConnectDialog] = React.useState(false);
  const [openSubscribeDialog, setOpenSubscribeDialog] = React.useState(false);

  return (
    <>
      <NavBar
        hidden={hideActionBtn}
        onChange={setHideActionBtn}
      />
      <MessageTable></MessageTable>
      <ConfigActions
        hidden={hideActionBtn}
        onConnectClick={setOpenConnectDialog}
        onSubscribeClick={setOpenSubscribeDialog}
      />
      <DialogWrapper 
        open={{openConnectDialog, openSubscribeDialog}}
        onChange={{setOpenConnectDialog, setOpenSubscribeDialog}}
      />
    </>
  );
}

export default App;
