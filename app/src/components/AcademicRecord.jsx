import React from 'react';
import {
  Typography, Button, CircularProgress, Link, Divider, withWidth, Grid, Fade,
} from '@material-ui/core';
import axios from 'axios';
import Box from './Box';
import firebase, { withToken } from '../database';
import { getToken } from '../utils';
import Paragraph from './Paragraph';
import portal from '../res/tutorial/portal.png';
import record from '../res/tutorial/record.png';
import download from '../res/tutorial/download.png';
import FileInput from './FileInput';
import ColouredSpan from './ColouredSpan';

function TutorialImage({ src, ...rest }) {
  return (
    <Box crossAlign="center">
      <Box maxWidth="100vw" margin="0 -4 6" style={{ overflow: 'auto' }}>
        <img alt="step" src={src} style={{ width: 'fit-content', border: '1px solid #c1c1c1' }} />
      </Box>
    </Box>
  );
}

class AcademicRecord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: false,
      ready: false,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const token = getToken(this.props);
    const db = withToken(token);

    Promise.all([
      db.hasAcceptedTerms(),
      db.hasUploadedRecord(),
    ]).then(([accepted, uploaded]) => {
      if (!accepted) {
        history.push(`/welcome/${token}`);
      } else if (uploaded) {
        history.push(`/gather/${token}`);
      } else {
        this.setState({ ready: true });
      }
    });
  }

  finishValidation() {
    this.setState({ busy: false });

    alert('Muito obrigado! Seu histórico foi armazenado em segurança.');

    const { history } = this.props;
    const token = getToken(this.props);
    history.push(`/gather/${token}`);
  }

  // eslint-disable-next-line class-methods-use-this
  validate(file, formData) {
    this.setState({ busy: true });
    const token = getToken(this.props);

    this.setState({ status: 'Validando' });

    axios.post('http://localhost:4000/validate', formData).then(({ data }) => {
      if (data === true) {
        const storageRef = firebase.storage().ref();

        this.setState({ status: 'Armazenando' });
        return storageRef.child(token).put(file);
      }

      this.setState({ busy: false });

      return Promise.reject();
    })
      .then(snapshot => (
        snapshot.ref.getDownloadURL()
      ))
      .then((url) => {
        withToken(token).setRecordUrl(url).then(() => this.finishValidation());
      })
      .catch((err) => {
        console.log('Erro:', err);
        alert('O arquivo enviado não parece ser um Histórico Escolar da UNIVALI. Lembre-se de enviar o PDF baixado da Intranet.');
      });
  }

  render() {
    const { busy, status, ready } = this.state;

    if (!ready) {
      return (
        <Box padding="4">
          <CircularProgress color="primary" size={60} />
        </Box>
      );
    }

    return (
      <Box padding="0 0 2" maxWidth="100vw">
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" align="center">
              Por favor, forneça seu Histórico Escolar.
            </Typography>

            <Box padding="6 0 4">
              <Paragraph>
                <span>Suas notas serão analisadas de maneira anônima, com o único objetivo </span>
                <span>de responder as perguntas de pesquisa estabelecidas no estudo. </span>
                <span>Sua identidade não será revelada sob nenhuma hipótese.</span>
              </Paragraph>
            </Box>

            <Divider />

            <Box padding="6 0 4">
              <Typography variant="h6" gutterBottom>
                Como obter o Histórico?
              </Typography>

              <Box padding="4 0 0">
                <Paragraph>
                  1. Faça login no <Link underline="always" target="_blank" rel="noopener" href="https://intranet.univali.br/intranet/indexMural.php">Intranet da UNIVALI.</Link>
                </Paragraph>
                <Paragraph>
                  2. Acesse seu curso no <ColouredSpan colour="secondary">Portal do Aluno (Acadêmico/Financeiro)</ColouredSpan>.
                </Paragraph>
                <TutorialImage src={portal} />
                <Paragraph>
                  3. No menu lateral, sob a seção <ColouredSpan colour="secondary"><q>Integralização</q></ColouredSpan>, acesse a opção <ColouredSpan colour="secondary"><q>Meu histórico</q></ColouredSpan>.
                </Paragraph>
                <TutorialImage src={record} />
                <Paragraph>
                  4. <ColouredSpan colour="secondary">Faça o download</ColouredSpan> do PDF seu histórico, salvando-o em um local de fácil acesso em seu dispositivo.
                </Paragraph>
                <TutorialImage src={download} />
                <Paragraph>
                  5. Envie-nos o documento baixado, utilizando o botão <ColouredSpan colour="secondary"><q>Selecionar aquivo</q></ColouredSpan> abaixo.
                </Paragraph>
              </Box>
            </Box>

            <Box crossAlign="center" padding="0 4">
              <Box>
                <FileInput
                  busy={busy}
                  onRead={(...args) => this.validate(...args)}
                />
              </Box>

              <Fade in={busy} timeout={500}>
                <Box margin="2 0 0">

                  <Typography>
                    {status}...
                  </Typography>
                </Box>
              </Fade>
            </Box>

            {/*
          TODO instruções sobre como obter o histórico escolar
          TODO botão para escolher arquivo e enviar requisição por Axios
        */}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default withWidth()(AcademicRecord);
