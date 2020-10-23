import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';

const defaultText = {
    closeBtn: 'Close',
}

export default function ConfigDialog(props) {
  const {
    open, 
    onChange,
    title,
    contentText,
    content,
    buttons} = props;
  const theme = useTheme();

  const handleClose = () => {
    onChange(false);
  };

  return (
      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="connect-dialog-title">
        <DialogTitle id="connect-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contentText}
          </DialogContentText>
          {content}
        </DialogContent>
        <DialogActions>
          {buttons}
          <Button onClick={handleClose} variant={theme.palette.type === 'dark' ? 'contained' : 'text'}>
            {theme.i18n('ConfigDialog','closeBtn', defaultText)}
          </Button>
        </DialogActions>
      </Dialog>
  );
}
