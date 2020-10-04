import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { MqttContext } from 'hooks/context/Contexts';
import ActionsRow from 'components/tables/ActionsRow';
import MessageRow from 'components/tables/MessageRow';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  container: {
      marginTop: theme.spacing(2),
  }
}));

const columns = {
    time: 'Time',
    topic: 'Topic',
    // qos: 'QoS',
    // retain: 'Retained',
    // dup: 'Duplicate',
    message: 'Message'
}

const collpasedColumns = {
    // time: 'Time',
    // topic: 'Topic',
    qos: 'QoS',
    retain: 'Retained',
    dup: 'Duplicate',
    // message: 'Message'
}

export default function CollapsibleTable() {
  const classes = useRowStyles();
  const [mqttState, dispatch] = React.useContext(MqttContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            <TableRow>
                <TableCell />
                {Object.entries(columns).map(([key, column]) => (
                    <TableCell key={key}>{column}</TableCell>
                ))}
                {/* <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
            </TableHead>
            <TableBody>
            {[...mqttState.messages].reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((message, index) => (
                <MessageRow 
                  key={index} 
                  row={message}
                  columns={columns}
                  collpasedColumns={collpasedColumns}
                />
            ))}
            </TableBody>
            <TableFooter>
              <ActionsRow
                rowsPerPageOptions={[10, 25, 50]}
                colSpan={7}
                count={mqttState.messages.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
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