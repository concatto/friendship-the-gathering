import React, { Component } from 'react';
import {
  Typography, RadioGroup, CircularProgress, withWidth, Button, Link,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Redirect } from 'react-router-dom';
import Box from './Box';
import { withToken } from '../database';
import Question from './Question';
import Option from './Option';
import { getToken, getGender } from '../utils';
import Avatar from './Avatar';
import ConfirmationDialog from './ConfirmationDialog';
import ColouredSpan from './ColouredSpan';

class Gather extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    this.retrieveData();
  }

  retrieveData() {
    const keys = Object.keys(this.state);
    const newState = lodash.zipObject(keys, keys.map(() => undefined));
    this.setState({ ...newState, dialogOpen: false });

    const token = getToken(this.props);
    const db = withToken(token);

    const queries = [
      db.getSelf(),
      db.getRandomSubject(),
      db.getRemainingResponses(),
    ];

    const postprocess = person => ({
      ...person,
      isMale: getGender(person.name) === 'M',
    });

    Promise.all(queries).then(([self, subject, remaining]) => {
      if (subject === null) {
        this.setState({ finished: true });
      } else {
        this.setState({
          subject: postprocess(subject),
          self: { ...postprocess(self.data()), id: self.id },
          remaining: remaining.length - 1,
        });
      }
    });
  }

  handleSubmit() {
    const { level, change, subject } = this.state;

    this.setState({ working: true, dialogOpen: false });

    withToken(getToken(this.props)).insertResponse(subject.id, level, change).then(() => {
      this.retrieveData();
    });
  }

  createRemainingMessage() {
    const { remaining } = this.state;

    switch (remaining) {
      case 0:
        return (
          <span>Esta é a <strong>última</strong> pessoa que você avaliará!</span>
        );
      case 1:
        return (
          <span>Além desta, resta apenas<strong>uma</strong> pessoa a ser avaliada.</span>
        );
      default:
        return (
          <span>Além desta, restam <strong>{remaining}</strong> pessoas a serem avaliadas.</span>
        );
    }
  }

  render() {
    const { width } = this.props;
    const {
      subject, self, change, level, finished, working, dialogOpen,
    } = this.state;

    if (!subject) {
      return (
        <Box padding="4 0 0">
          {finished === true ? (
            <Redirect to="/finished" />
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
        <Question description={<span>1. Qual o seu nível de amizade com <ColouredSpan colour="secondary">{subject.name.split(' ')[0]}</ColouredSpan>?</span>}>
          <RadioGroup value={level} onChange={e => this.setState({ level: e.target.value })}>
            <Option value="0" label="0 - Não conheço." />
            <Option value="1" label="1 - Sei quem é, mas não conversamos." />
            <Option value="2" label="2 - Conversamos de vez em quando." />
            <Option value="3" label={`3 - ${subject.isMale ? 'Amigo próximo' : 'Amiga próxima'}, conversamos com certa frequência.`} />
            <Option value="4" label={`4 - ${subject.isMale ? 'Melhor amigo' : 'Melhor amiga'}, conversamos quase todo dia!`} />
          </RadioGroup>
        </Question>
        <Question description="2. No último ano, houve mudança no nível de amizade entre vocês?">
          <RadioGroup value={change} onChange={e => this.setState({ change: e.target.value })}>
            <Option value="decreased" label="Diminuiu. Ficamos mais distantes." />
            <Option value="stable" label="Manteve-se igual." />
            <Option value="increased" label={`Aumentou. Ficamos mais ${subject.isMale || self.isMale ? 'próximos' : 'próximas'}.`} />
          </RadioGroup>
        </Question>

        <Box crossAlign="center" padding="4 0" position="relative">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState({ dialogOpen: true })}
            size="large"
            disabled={level === undefined || change === undefined || working}
          >
            Confirmar
          </Button>

          {working && (
            <CircularProgress style={{ position: 'absolute', marginLeft: 120 }} />
          )}
        </Box>

        <Box padding="6 0 0">
          <Typography align="center">
            {this.createRemainingMessage()}
          </Typography>
          <Typography align="center" gutterBottom>
            Respondendo como: <strong>{self.name}</strong>.
          </Typography>
          <Typography align="center">
            <span>Ícones produzidos por <Link href="https://www.freepik.com/" title="Freepik">Freepik</Link> </span>
            <span>e disponibilizados por <Link href="https://www.flaticon.com/" title="Flaticon">flaticon</Link></span>
          </Typography>
        </Box>

        <ConfirmationDialog
          open={dialogOpen}
          onConfirm={() => this.handleSubmit()}
          onClose={() => this.setState({ dialogOpen: false })}
        />
      </Box>
    );
  }
}

Gather.propTypes = {
  width: PropTypes.any,
};

export default withWidth()(Gather);
