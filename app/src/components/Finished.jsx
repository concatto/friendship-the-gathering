import React, { Component } from 'react';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import Box from './Box';
import { withToken } from '../database';

class Finished extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: false,
    };
  }


  handleReset() {
    const { history } = this.props;
    const token = '51072caf-4247-43af-8667-d8c382891e71';

    this.setState({ busy: true });
    withToken(token).resetResponses().then(() => {
      this.setState({ busy: false });

      history.push(`/welcome/${token}`);
    });
  }

  render() {
    const { busy } = this.state;

    return (
      <Box padding="4 0" crossAlign="center">
        <Typography variant="h4" align="center">
          Você completou o questionário! Muito obrigado!
        </Typography>

        <Box padding="4 0" />

        <Button
          disabled={busy}
          color="secondary"
          variant="outlined"
          size="large"
          onClick={() => this.handleReset()}
        >
          Reiniciar demonstração
        </Button>

        {busy && (
          <Box padding="4">
            <Box padding="2 0" />
            <CircularProgress color="primary" size={60} />
          </Box>
        )}
      </Box>
    );
  }
}

export default Finished;
