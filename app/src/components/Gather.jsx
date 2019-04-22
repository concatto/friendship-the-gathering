import React, { Component } from 'react';
import {
  Typography, RadioGroup, CircularProgress, withWidth, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import Box from './Box';
import { withToken } from '../database';
import Question from './Question';
import Option from './Option';
import { getToken, getGender } from '../utils';
import Avatar from './Avatar';

class Gather extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData() {
    const keys = Object.keys(this.state);
    const newState = lodash.zipObject(keys, keys.map(() => undefined));
    this.setState(newState);

    const token = getToken(this.props);
    const db = withToken(token);

    const queries = [
      db.getSelf(),
      db.getRandomSubject(),
    ];

    const postprocess = person => ({
      ...person,
      isMale: getGender(person.name) === 'M',
    });

    Promise.all(queries).then(([self, subject]) => {
      if (subject === null) {
        this.setState({ finished: true });
      } else {
        this.setState({
          subject: postprocess(subject),
          self: { ...postprocess(self.data()), id: self.id },
        });
      }
    });
  }

  handleSubmit() {
    this.retrieveData();
  }

  render() {
    const { width } = this.props;
    const {
      subject, self, change, level, finished,
    } = this.state;

    if (!subject) {
      return (
        <Box padding="4 0 0">
          {finished === true ? (
            <Typography variant="h4" align="center">
              Você completou o questionário! Muito obrigado!
            </Typography>
          ) : (
            <CircularProgress color="primary" size={80} />
          )}
        </Box>
      );
    }

    return (
      <Box>
        <Box padding={width === 'xs' ? '1 0' : '4 0'}>
          <Box padding="0 0 4" crossAlign="center">
            <Avatar name={subject.name} gender={subject.isMale ? 'M' : 'F'} width={100} />
            <Box padding="2" />
            <Typography variant={width === 'xs' ? 'h4' : 'h2'} align="center">
              {subject.name}
            </Typography>
          </Box>
        </Box>
        <Question description={`1. Qual o seu nível de amizade com ${subject.name.split(' ')[0]}?`}>
          <RadioGroup value={level} onChange={e => this.setState({ level: e.target.value })}>
            <Option value="0" label="0 - Não conheço" />
            <Option value="1" label="1 - Sei quem é, mas não conversamos" />
            <Option value="2" label="2 - Conversamos de vez em quando" />
            <Option value="3" label={`3 - ${subject.isMale ? 'Amigo próximo' : 'Amiga próxima'}, conversamos com certa frequência`} />
            <Option value="4" label={`4 - ${subject.isMale ? 'Melhor amigo' : 'Melhor amiga'}, conversamos quase todo dia`} />
          </RadioGroup>
        </Question>
        <Question description="2. No último ano, houve mudança no nível de amizade entre vocês?">
          <RadioGroup value={change} onChange={e => this.setState({ change: e.target.value })}>
            <Option value="decreased" label="Diminuiu. Ficamos mais distantes." />
            <Option value="stable" label="Manteve-se igual." />
            <Option value="increased" label={`Aumentou. Ficamos mais ${subject.isMale || self.isMale ? 'próximos' : 'próximas'}.`} />
          </RadioGroup>
        </Question>

        <Box crossAlign="center" padding="4 0">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleSubmit()}
            size="large"
            disabled={level === undefined || change === undefined}
          >
            Confirmar
          </Button>
        </Box>

        <Box padding="4 0 0">
          <Typography align="center">
            Respondendo como: <strong>{self.name}</strong>
          </Typography>
          <Typography align="center">
            Ícones produzidos por <a href="https://www.freepik.com/" title="Freepik">Freepik</a> e disponibilizados por <a href="https://www.flaticon.com/" title="Flaticon">flaticon</a>
          </Typography>
        </Box>
      </Box>
    );
  }
}

Gather.propTypes = {
  width: PropTypes.any,
};

export default withWidth()(Gather);
