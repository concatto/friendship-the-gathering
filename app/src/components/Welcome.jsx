import React, { Component } from 'react';
import {
  Typography, Button, CircularProgress, Grid, Link,
} from '@material-ui/core';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from './Box';
import { withToken } from '../database';
import { getToken } from '../utils';
import ColouredSpan from './ColouredSpan';

const Paragraph = ({ children, ...rest }) => (
  <Typography style={{ fontSize: 18, marginBottom: 22, fontWeight: 300 }} {...rest}>
    {children}
  </Typography>
);

Paragraph.propTypes = {
  children: PropTypes.any,
};

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

    const InfoLink = props => <RouterLink to="/info" {...props} />;

    return (
      <Box crossAlign="center">
        <Typography variant="h2">
          Friendship: The Gathering
        </Typography>

        <Box padding="8 0 4" crossAlign="center">
          <Grid container justify="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" color="primary" style={{ marginBottom: 24 }}>
                Olá! Tudo bem?
              </Typography>
              <Paragraph>
                <span>Este é um questionário desenvolvido para coletar algumas informações </span>
                <span>sobre seu círculo social, com o objetivo de viabilizar um estudo </span>
                <span>multidisciplinar que busca compreender como <ColouredSpan colour="secondary">laços de amizade</ColouredSpan> </span>
                <span>influenciam no desempenho de estudantes. Se quiser, você pode conferir </span>
                <span>mais informações sobre o estudo e os pesquisadores responsáveis <Link component={InfoLink} color="primary">aqui</Link>.</span>
              </Paragraph>
              <Paragraph>
                <span>Sabemos que perguntas desta natureza são bastante sensíveis e </span>
                <span>entendemos que elas podem lhe causar algum desconforto. <ColouredSpan colour="secondary">Sinta-se livre</ColouredSpan> </span>
                <span>para não responder o questionário caso não se sentir confortável.</span>
              </Paragraph>
              <Paragraph>
                <span>Preocupamo-nos muito com o sigilo de suas informações e tomamos o </span>
                <span>máximo de cuidado para protegê-las. Todos os seus dados pessoais </span>
                <span>passarão por um processo de <ColouredSpan colour="secondary">anonimização</ColouredSpan>, transformando em código </span>
                <span>quaisquer informações que possam lhe identificar.</span>
              </Paragraph>
              <Paragraph color="primary">
                Ficamos muito gratos pela sua atenção e compreensão.
              </Paragraph>
            </Grid>
          </Grid>

          <Box padding="4 0" crossAlign="center">
            {self === undefined ? (
              <CircularProgress color="primary" size={80} />
            ) : (
              <>
                <Box padding="0 0 4" crossAlign="center">
                  <Paragraph>
                    Você é: {self.name}
                  </Paragraph>
                  <Typography>
                    {remaining === 1 ? 'Resta apenas uma pergunta!' : `Ainda restam ${remaining} perguntas.`}
                  </Typography>
                </Box>

                <Button variant="contained" color="primary" onClick={() => this.handleStart()} size="large">
                  Começar
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Welcome;
