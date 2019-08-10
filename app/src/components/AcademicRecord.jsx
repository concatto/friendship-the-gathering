import React from 'react';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import Box from './Box';
import firebase, { withToken } from '../database';
import { getToken } from '../utils';

function FileInput({ onRead, ...rest }) {
  const inputRef = React.useRef(null);

  function handleChange() {
    const { files } = inputRef.current;

    if (onRead && files) {
      for (let i = 0; i < files.length; i += 1) {
        const formData = new FormData();
        // const reader = new FileReader();

        // reader.onload = (e) => {
        //   const { name, size } = files[i];
        //   // console.log(e);
        //   onRead({ name, size, data: e.target.result });
        //   // $('#blah').attr('src', e.target.result);
        // };

        // reader.readAsDataURL(files[i]);
        // console.log(files[i]);

        formData.append('record', files[i]);
        onRead(files[i], formData);
      }
    }
  }

  return (
    <>
      <input
        type="file"
        accept="*/*"
        onChange={() => handleChange()}
        style={{ display: 'none' }}
        onClick={(e) => { e.target.value = null; }}
        ref={inputRef}
      />

      <Button
        color="primary"
        variant="outlined"
        size="large"
        onClick={() => inputRef.current.click()}
        {...rest}
      >
        Selecionar arquivo
      </Button>
    </>
  );
}

class AcademicRecord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: false,
    };
  }

  componentDidMount() {
    withToken(getToken(this.props)).hasAcceptedTerms().then(console.log);
  }

  finishValidation() {
    this.setState({ busy: false, status: '' });

    console.log('Probably redirect the user ahead by now');
  }

  // eslint-disable-next-line class-methods-use-this
  validate(file, formData) {
    this.setState({ busy: true });
    const token = getToken(this.props);

    axios.post('http://localhost:4000/validate', formData).then(({ data }) => {
      this.setState({ status: 'Validando' });

      if (data === true) {
        console.log('Ok, store it and go ahead.');
        const storageRef = firebase.storage().ref();

        this.setState({ status: 'Armazenando' });
        return storageRef.child(token).put(file);
      }

      console.log('Invalid!!!');
      this.setState({ busy: false, status: '' });
      return Promise.reject();
    }).then(snapshot => (
      snapshot.ref.getDownloadURL()
    )).then((url) => {
      withToken(token).setRecordUrl(url).then(() => this.finishValidation());
    });
  }

  render() {
    const { busy, status } = this.state;

    return (
      <Box padding="4 0" crossAlign="center">
        <Typography variant="h4" align="center">
          Por favor, forneça seu Histórico Escolar para prosseguir.
        </Typography>

        <Box padding="4">
          <FileInput
            disabled={busy}
            onRead={(...args) => this.validate(...args)}
          />
        </Box>

        {busy && (
          <Box padding="2" crossAlign="center">
            <CircularProgress color="primary" size={60} />

            <Box padding="2 0" />

            <Typography>
              {status}...
            </Typography>
          </Box>
        )}

        {/*
          TODO instruções sobre como obter o histórico escolar
          TODO botão para escolher arquivo e enviar requisição por Axios
        */}
      </Box>
    );
  }
}

export default AcademicRecord;
