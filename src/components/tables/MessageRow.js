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
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
  
  
export default function MessageRow(props) {
    const { columns, collpasedColumns, row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const colSpan = Object.keys(columns).length + 1;
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
          { collpasedColumns ?
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          : null}
          </TableCell>
          {Object.keys(columns).map((column) => (
              <TableCell key={column}>{column === 'time' ? new Date(row[column]).toLocaleString() : row[column]}</TableCell>
          ))}
        </TableRow>
        { collpasedColumns ? 
            <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={colSpan}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                    Metadata
                    </Typography>
                    <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                        {Object.entries(collpasedColumns).map(([key, column]) => (
                            <TableCell key={key}>{column}</TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {Object.keys(collpasedColumns).map((column) => (
                                <TableCell key={column}>{column === 'time' ? new Date(row[column]).toLocaleString() : row[column]}</TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                    </Table>
                </Box>
                </Collapse>
            </TableCell>
            </TableRow>
        : null}
      </React.Fragment>
    );
  }
  
  // MessageRow.propTypes = {
  //   row: PropTypes.shape({
  //     calories: PropTypes.number.isRequired,
  //     carbs: PropTypes.number.isRequired,
  //     fat: PropTypes.number.isRequired,
  //     history: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         amount: PropTypes.number.isRequired,
  //         customerId: PropTypes.string.isRequired,
  //         date: PropTypes.string.isRequired,
  //       }),
  //     ).isRequired,
  //     name: PropTypes.string.isRequired,
  //     price: PropTypes.number.isRequired,
  //     protein: PropTypes.number.isRequired,
  //   }).isRequired,
  // };