import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { MqttContext } from 'hooks/context/Contexts';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles((theme) => ({
  control: {
    fontWeight: 400,
    cursor: 'pointer',
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary
    }
  },
}));

export default function ActionsRow(props) {
  const classes = useStyles2();
  const [mqttState, dispatch] = React.useContext(MqttContext);

  const { count, page, rowsPerPage, onChangePage, onChangeRowsPerPage, rowsPerPageOptions, colSpan, SelectProps } = props;

  const togglePause = () => {
    dispatch({type: 'togglePause'});
  }

  return (
          <TableRow>
            <TableCell>
              { mqttState.pause ? 
                <PlayCircleOutlineIcon onClick={togglePause} className={`MuiSvgIcon-root ${classes.control}`}/> :
                <PauseCircleOutlineIcon onClick={togglePause} className={`MuiSvgIcon-root ${classes.control}`}/>
              }
            </TableCell>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              colSpan={colSpan-1}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={SelectProps}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
  );
}
