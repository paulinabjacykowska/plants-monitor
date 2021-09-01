import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@material-ui/core';

function ConfirmationModal({
  title,
  content,
  children,
  confirmText,
  cancelText,
}) {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);
  const onConfirmRef = useRef();

  const handleConfirmRequest = onConfirmProp => event => {
    event.preventDefault();

    onConfirmRef.current = onConfirmProp;
    setIsOpened(true);
  };

  const handleConfirm = event => {
    onConfirmRef.current(event);
    setIsOpened(false);
  };

  const handleCancel = () => setIsOpened(false);

  return (
    <>
      {children(handleConfirmRequest)}
      <Dialog
        open={isOpened}
        onBackdropClick={handleCancel}
        maxWidth="xs"
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title && (
          <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
        )}
        {content && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCancel}>{cancelText || 'Cancel'}</Button>
          <Button
            className={classes.button}
            onClick={handleConfirm}
            color="primary"
          >
            {confirmText || 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles({
  button: {
    fontWeight: 500,
  },
});

export default ConfirmationModal;
