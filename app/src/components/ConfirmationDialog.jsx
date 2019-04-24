import React, { Component } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

class ConfirmationDialog extends Component {
  render() {
    const {
      onClose, onConfirm, open, ...rest
    } = this.props;

    return (
      <Dialog onClose={onClose} open={open} {...rest}>
        <DialogTitle>Esta ação é permanente!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>Uma vez que você confirmar sua resposta, não há como voltar atrás </span>
            <span>e alterar estas informações. Por favor, certifique-se que suas </span>
            <span>escolhas foram honestas e verdadeiras.</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Voltar atrás
          </Button>
          <Button onClick={onConfirm} color="primary">
            Entendi, confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  onClose: PropTypes.any,
  onConfirm: PropTypes.any,
  open: PropTypes.any,
};

export default ConfirmationDialog;
