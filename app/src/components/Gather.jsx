import React, { Component } from 'react';
import {
  Typography, RadioGroup, CircularProgress, withWidth, Button, Link, IconButton, Grid, Tooltip,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { Redirect } from 'react-router-dom';
import Hide from '@material-ui/icons/Visibility';
import Show from '@material-ui/icons/VisibilityOff';
import Box from './Box';
import { withToken } from '../database';
import Question from './Question';
import Option from './Option';
import { getToken, getGender, anonymize } from '../utils';
import Avatar from './Avatar';
import ConfirmationDialog from './ConfirmationDialog';
import ColouredSpan from './ColouredSpan';
import browserStore from '../browserStore';
import RequestButton from './RequestButton';
import TutorialTooltip, { hideTutorialTooltip, isTutorialTooltipHidden } from './TutorialTooltip';

class Gather extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const token = getToken(this.props);

    withToken(token).hasUploadedRecord().then((didUpload) => {
      console.log('didupload?', didUpload);
      if (didUpload) {
        this.retrieveData();
      } else {
        const { history } = this.props;
        history.push(`/record/${token}`);
      }
    });
  }

  getSecondQuestionValue() {
    const { level, change } = this.state;

    if (level === '0') {
      return 'stable';
    }

    return change || '';
  }

  retrieveData() {
    const keys = Object.keys(this.state);
    const newState = lodash.zipObject(keys, keys.map(() => undefined));
    this.setState({ ...newState, dialogOpen: false, nameHidden: true });

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
          anonymousSubject: anonymize(subject.name),
          self: { ...postprocess(self.data()), id: self.id },
          remaining: remaining.length - 1,
        });
      }
    });
  }

  handleSubmit(checked) {
    const { level, subject } = this.state;

    browserStore.insert('doNotDisturb', checked, false);

    this.setState({ working: true, dialogOpen: false });

    withToken(getToken(this.props)).insertResponse(subject.id, level, this.getSecondQuestionValue()).then(() => {
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
          <span>Além desta, resta apenas <strong>uma</strong> pessoa a ser avaliada.</span>
        );
      default:
        return (
          <span>Além desta, restam <strong>{remaining}</strong> pessoas a serem avaliadas.</span>
        );
    }
  }

  handleConfirm() {
    // Check if the user does not want to see the confirmation dialog
    if (browserStore.find('doNotDisturb') === 'true') {
      this.handleSubmit(true);
    } else {
      this.setState({ dialogOpen: true });
    }
  }

  makeTooltip() {
    const { width } = this.props;
    const { nameHidden } = this.state;
    const tutorialHidden = isTutorialTooltipHidden();
    const mobile = width === 'xs';

    return props => (
      <>
        {tutorialHidden ? (
          <Tooltip title={nameHidden ? 'Revelar nome' : 'Ocultar nome'} placement="right" {...props} />
        ) : (
          <TutorialTooltip content={`Para revelar o nome do seu colega, ${mobile ? 'toque' : 'clique'} neste botão.`} {...props} />
        )}
      </>
    );
  }

  render() {
    const { width } = this.props;
    const {
      subject, anonymousSubject, self, level, finished, working, dialogOpen, nameHidden,
    } = this.state;

    const change = this.getSecondQuestionValue();

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
    console.log('Change = ', change);

    const Icon = nameHidden ? Show : Hide;
    const displayName = nameHidden ? anonymousSubject : subject.name;
    const mobile = width === 'xs';

    const AdaptableTooltip = this.makeTooltip();

    return (
      <Box flex="grow" width="100%">
        <Grid container justify="center">
          <Grid item xs={12} sm={5}>

            <Box padding={width === 'xs' ? '1 0' : '4 0'}>
              <Box padding="0 0 4" crossAlign="center">
                <Avatar name={subject.name} gender={subject.isMale ? 'M' : 'F'} width={100} />

                <Box padding="2 0">
                  {/* <Tooltip title="Revelar nome" placement="right"> */}
                  <AdaptableTooltip>
                    <IconButton onClick={() => { hideTutorialTooltip(); this.setState({ nameHidden: !nameHidden }); }}>
                      <Icon fontSize="large" />
                    </IconButton>
                  </AdaptableTooltip>
                  {/* </Tooltip> */}
                </Box>
                <Box>
                  <Typography variant={mobile ? 'h4' : 'h2'} align="center">
                    {displayName}
                  </Typography>
                </Box>

              </Box>
            </Box>
            <Question description={<span>1. Qual o seu nível de amizade com <ColouredSpan colour="secondary">{displayName.split(' ')[0]}</ColouredSpan>?</span>}>
              <RadioGroup value={level} onChange={e => this.setState({ level: e.target.value })}>
                <Option value="0" label="0 - Não conheço." />
                <Option value="1" label="1 - Sei quem é, mas não conversamos." />
                <Option value="2" label={`2 - ${subject.isMale ? 'Conhecido' : 'Conhecida'}; conversamos de vez em quando.`} />
                <Option value="3" label={`3 - ${subject.isMale ? 'Amigo' : 'Amiga'}. Nos damos bem.`} />
                <Option value="4" label={`4 - ${subject.isMale ? 'Amigo próximo' : 'Amiga próxima'}, conversamos com frequência!`} />
                <Option value="5" label={`5 - ${subject.isMale ? 'Melhor amigo' : 'Melhor amiga'}, conversamos quase todo dia!`} />
              </RadioGroup>
            </Question>
            <Question disabled={level === '0'} description="2. Nos últimos meses, houve mudança no nível de amizade entre vocês?">
              <RadioGroup value={change} onChange={e => this.setState({ change: e.target.value })}>
                <Option disabled={level === '0'} value="decreased" label="Diminuiu. Ficamos mais distantes." />
                <Option disabled={level === '0'} value="stable" label="Manteve-se igual." />
                <Option disabled={level === '0'} value="increased" label={`Aumentou. Ficamos mais ${subject.isMale || self.isMale ? 'próximos' : 'próximas'}.`} />
              </RadioGroup>
            </Question>


            <RequestButton
              padding="2 0 3"
              variant="contained"
              color="primary"
              onClick={() => this.handleConfirm()}
              disabled={level === undefined || change === undefined}
              busy={working}
            >
              Confirmar
            </RequestButton>


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
              onConfirm={checked => this.handleSubmit(checked)}
              onClose={() => this.setState({ dialogOpen: false })}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

Gather.propTypes = {
  width: PropTypes.any,
};

export default withWidth()(Gather);
