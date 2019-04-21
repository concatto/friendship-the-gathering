import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import Box from './Box';
import { withToken } from '../database';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      self: {},
    };
  }

  componentDidMount() {
    const db = withToken(this.getToken());

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

  getToken() {
    const { match } = this.props;
    const { token = '' } = match.params;

    return token;
  }

  handleStart() {
    const db = withToken(this.getToken());

    db.getRandomSubject().then((subject) => {
      alert(JSON.stringify(subject));
    });
  }

  render() {
    console.log(this.props);
    const { self, remaining } = this.state;

    return (
      <Box crossAlign="center" padding="8 4">
        <Typography variant="h2">
          Friendship: The Gathering
        </Typography>

        <Box padding="4 0">
          <Typography>
            Você é: {self.name}
          </Typography>
          <Typography>
            Ainda faltam {remaining} respostas!
          </Typography>
        </Box>

        <Button variant="contained" color="primary" onClick={() => this.handleStart()}>
          Responder
        </Button>
      </Box>
    );
  }
}

export default Welcome;
