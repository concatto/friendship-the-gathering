import React, { Component } from 'react';
import {
  Typography, Button, CircularProgress, Grid, Link, FormControlLabel, Checkbox, withWidth, TextField,
} from '@material-ui/core';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from './Box';
import { withToken } from '../database';
import { getToken } from '../utils';
import ColouredSpan from './ColouredSpan';
// import tcle from '../res/tcle.pdf';

const tcle = 'https://concatto-ttc.s3-sa-east-1.amazonaws.com/tcle_meta.pdf';

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

    this.state = {
      checked: false,
      phone: '',
      name: '',
    };
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
        name: self.data().name,
      });
    });
  }

  handleStart() {
    const token = getToken(this.props);

    const { history } = this.props;
    history.push(`/gather/${token}`);
  }

  handleChange(name) {
    return e => this.setState({ [name]: e.target.value });
  }

  render() {
    console.log(this.props);
    const { width } = this.props;
    const {
      self, remaining, checked, name, phone,
    } = this.state;

    if (remaining === 0) {
      return (
        <Redirect to="/finished" />
      );
    }

    const InfoLink = props => <RouterLink to="/info" {...props} />;

    return (
      <Box crossAlign="center">
        <Box crossAlign="center">

          <Typography variant="h2" align="center" gutterBottom>
            Instrumento de Pesquisa:
          </Typography>
          <Typography variant="h4" align="center">
            Proximidade Social no Ensino Superior
          </Typography>
        </Box>

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
                <span>influenciam no desempenho de estudantes. Para participar da pesquisa, você deve estar </span>
                <span>de acordo com o Termo de Consentimento Livre e Esclarecido, apresentado abaixo.</span>
              </Paragraph>

              <Box padding="2 0">
                {/* <object data={tcle} type="application/pdf" width="100%" height="600px" name="test" title="second">
                  <embed src={tcle} type="application/pdf" title="third" />
                </object> */}
                <embed
                  src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${tcle}`}
                  width="100%"
                  height="600"
                />
              </Box>

              <Box crossAlign="center" padding="2 0 4">
                <Button color="secondary" variant="outlined" component="a" href={tcle} target="_blank">
                  Baixar via
                </Button>
              </Box>

              <Box padding="0 0 6" crossAlign="center">
                <Box padding={width === 'xs' ? '0' : '0 8'}>
                  <Box direction="row" crossAlign="flex-start">

                    <Checkbox
                      color="primary"
                      checked={checked}
                      onChange={e => this.setState({ checked: e.target.checked })}
                    />
                    <Box padding="1 0 0 1">
                      <Paragraph>
                    Eu concordo em participar do presente estudo como participante. O pesquisador me
                    informou sobre tudo o que vai acontecer na pesquisa, o que terei que fazer, inclusive sobre os
                    possíveis riscos e benefícios envolvidos na minha participação. O pesquisador me garantiu que
                    eu poderei sair da pesquisa a qualquer momento, sem dar nenhuma explicação, e que esta
                    decisão não me trará nenhum tipo de penalidade ou interrupção de meu tratamento.
                      </Paragraph>
                    </Box>
                  </Box>

                  <Box padding={width === 'xs' ? '2 0' : '2 2'}>
                    <TextField label="Nome" value={name} onChange={this.handleChange('name')} />
                    <Box padding="1 0" />
                    <TextField label="Telefone para contato" value={phone} onChange={this.handleChange('phone')} />
                  </Box>
                </Box>
              </Box>

              <Paragraph color="primary" align="center">
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

                <Button variant="contained" color="primary" onClick={() => this.handleStart()} size="large" disabled={!checked}>
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

export default withWidth()(Welcome);
