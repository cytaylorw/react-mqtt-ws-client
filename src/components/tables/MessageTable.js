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
import Container from '@material-ui/core/Container';
import { AppSettingContext, MqttContext, MqttSettingContext } from 'hooks/context/Contexts';
import ActionsRow from 'components/tables/ActionsRow';
import MessageRow from 'components/tables/MessageRow';
import { columns, collpasedColumns } from 'lib/converter/MessageConverter';

const useRowStyles = makeStyles((theme) => ({
  container: {
      marginTop: theme.spacing(2),
  }
}));

const defaultText = {
  rowsPerPage: 'rows per page'
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
  const filtered = mqttState.messages.filter((message) => {
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
  })
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Container maxWidth="xl" className={classes.container}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <ActionsRow
              rowsPerPageOptions={pageOptions}
              colSpan={colSpan}
              count={mqttState.messages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': theme.i18n('MessageTable','rowsPerPage', defaultText) },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
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
            <ActionsRow
              rowsPerPageOptions={pageOptions}
              colSpan={colSpan}
              count={mqttState.messages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': theme.i18n('MessageTable','rowsPerPage', defaultText) },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}
