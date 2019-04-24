import React, { Component } from 'react';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Box from './Box';
import { withToken } from '../database';
import { getToken } from '../utils';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const db = withToken(getToken(this.props));

    const queries = [
      db.getSelf(),
      db.getRemainingResponses(),
    ];

    Promise.all(queries).then(([self, remaining]) => {
      this.setState({
        self: self.data(),
        remaining: remaining.length,
      });
    });

    db.getRandomSubject();
  }

  handleStart() {
    const token = getToken(this.props);

    const { history } = this.props;
    history.push(`/gather/${token}`);
  }

  render() {
    console.log(this.props);
    const { self, remaining } = this.state;

    if (remaining === 0) {
      return (
        <Redirect to="/finished" />
      );
    }

    return (
      <Box crossAlign="center">
        <Typography variant="h2">
          Friendship: The Gathering
        </Typography>

        {self === undefined ? (
          <Box padding="4 0">
            <CircularProgress color="primary" size={80} />
          </Box>
        ) : (
          <>
            <Box padding="4 0">
              <Typography>
                Você é: {self.name}
              </Typography>
              <Typography>
                {remaining === 1 ? 'Resta apenas uma resposta!' : `Ainda restam ${remaining} respostas!`}
              </Typography>
            </Box>

            <Button variant="contained" color="primary" onClick={() => this.handleStart()}>
              Responder
            </Button>
          </>
        )}
      </Box>
    );
  }
}

export default Welcome;
