import React, { Component } from 'react';
import {
  Typography, Button, CircularProgress, withWidth,
} from '@material-ui/core';
import Box from './Box';
import { withToken } from '../database';
import Paragraph from './Paragraph';
import ColouredSpan from './ColouredSpan';

class Finished extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: false,
    };
  }


  // handleReset() {
  //   const { history } = this.props;
  //   const token = '51072caf-4247-43af-8667-d8c382891e71';

  //   this.setState({ busy: true });
  //   withToken(token).resetResponses().then(() => {
  //     this.setState({ busy: false });

  //     history.push(`/welcome/${token}`);
  //   });
  // }

  render() {
    const { width } = this.props;
    const { busy } = this.state;
    const mobile = width === 'xs';

    return (
      <Box padding="4 0" crossAlign="center">
        <Typography variant="h4" align="center" paragraph>
          Você completou o questionário!
        </Typography>

        <Box padding={`4 ${mobile ? '0' : '8'}`}>
          <Paragraph align="center">
            Ficamos muitíssimos agradecidos por sua participação. Suas informações permanecerão em sigilo e serão tratadas com o máximo de cuidado.
          </Paragraph>
          <Paragraph align="center">
            <ColouredSpan colour="primary">Sem você, este estudo não seria possível. <span style={{ fontWeight: 400 }}>Obrigado!</span></ColouredSpan>
          </Paragraph>
        </Box>

        {/* <Box padding="4 0" />

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
        )} */}
      </Box>
    );
  }
}

export default withWidth()(Finished);
