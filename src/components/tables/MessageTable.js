import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { AppSettingContext, MqttContext, MqttSettingContext } from 'hooks/context/Contexts';
import ActionsRow from 'components/tables/ActionsRow';
import MessageRow from 'components/tables/MessageRow';
import { columns, collpasedColumns } from 'lib/converter/MessageConverter';

const useRowStyles = makeStyles((theme) => ({
  container: {
      paddingTop: theme.spacing(10),
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default 
  },
  noMessage: {
    textAlign: 'center'
  }
}));

const defaultText = {
  rowsPerPage: 'rows per page',
  noMessage: 'No message to display.'
}

export default function MessageTable() {
  const classes = useRowStyles();
  const theme = useTheme();
  const [mqttState, ] = React.useContext(MqttContext);
  const [mqttSetting, ] = React.useContext(MqttSettingContext);
  const [appSetting, ] = React.useContext(AppSettingContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const tableColumns = columns[mqttSetting.subscribeTo.converter] ? 
    columns[mqttSetting.subscribeTo.converter] : 
    columns['default'];
  const colSpan = Object.keys(tableColumns).length+1;
  const pageOptions = [10, 25, 50, 100];
  const filtered = appSetting.filterOn ? mqttState.messages.filter((message) => {
    if(appSetting.filter.time[0]){
      let time = new Date(appSetting.filter.time[0]);
      if(message.time < time.getTime()) return false;
    }
    if(appSetting.filter.time[1]){
      let time = new Date(appSetting.filter.time[1]);
      if(message.time > time.getTime()) return false;
    }
    if(appSetting.filter.text[0] && appSetting.filter.text[1]){
      let regex =  new RegExp(appSetting.filter.text[1], 'i');
      if(!regex.test(message[appSetting.filter.text[0]])) return false;
    }
    return true;
  }) : mqttState.messages;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const actionsRow = (
    <ActionsRow
      rowsPerPageOptions={pageOptions}
      colSpan={colSpan}
      count={filtered.length}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: { 'aria-label': theme.i18n('MessageTable','rowsPerPage', defaultText) },
        native: true,
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  return filtered?.length ? (
    
      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            {actionsRow}
          </TableHead>
          <TableHead>
            <TableRow>
                <TableCell />
                {Object.entries(tableColumns).map(([key, column]) => (
                    <TableCell key={key}>{column}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {filtered.reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((message, index) => (
              <MessageRow 
                key={index} 
                row={message}
                columns={tableColumns}
                collpasedColumns={collpasedColumns[mqttSetting.subscribeTo.converter]}
              />
          ))}
          </TableBody>
          <TableFooter>
            {actionsRow}
          </TableFooter>
        </Table>
      </TableContainer>
  ) : (
    <Paper elevation={3}> 
      <Typography variant="h4" className={classes.noMessage}>
        {theme.i18n('MessageTable','noMessage', defaultText)}
      </Typography> 
    </Paper>
  );
}
