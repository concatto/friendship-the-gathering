import React, { Component } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Checkbox, FormControlLabel, withWidth,
} from '@material-ui/core';
import PropTypes from 'prop-types';

class ConfirmationDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  render() {
    const {
      onClose, onConfirm, open, width, ...rest
    } = this.props;

    const { checked } = this.state;
    const isMobile = width === 'xs';

    return (
      <Dialog onClose={onClose} open={open} {...rest}>
        <DialogTitle>Esta ação é permanente!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>Uma vez que você confirmar sua resposta, não há como voltar atrás </span>
            <span>e alterar estas informações. Por favor, certifique-se que suas </span>
            <span>escolhas foram honestas e verdadeiras.</span>

          </DialogContentText>
          <FormControlLabel
            control={(
              <Checkbox
                checked={checked}
                onChange={e => this.setState({ checked: e.target.checked })}
              />
            )}
            style={{ marginTop: 16, marginBottom: -20 }}
            label="Não mostrar novamente"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            {isMobile ? 'Voltar' : 'Voltar atrás'}
          </Button>
          <Button onClick={() => onConfirm(checked)} color="primary">
            {isMobile ? 'Confirmar' : 'Entendi, confirmar'}
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
  width: PropTypes.any,
};

export default withWidth()(ConfirmationDialog);
