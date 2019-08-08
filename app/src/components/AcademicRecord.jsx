import React from 'react';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import Box from './Box';
import { withToken } from '../database';

function FileInput({ onRead }) {
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
        console.log(files[i]);
        formData.append('test', files[i]);
        onRead(formData);
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


  handleReset() {
    const { history } = this.props;
    const token = '51072caf-4247-43af-8667-d8c382891e71';

    this.setState({ busy: true });
    withToken(token).resetResponses().then(() => {
      this.setState({ busy: false });

      history.push(`/welcome/${token}`);
    });
  }

  render() {
    const { busy } = this.state;

    return (
      <Box padding="4 0" crossAlign="center">
        <Typography variant="h4" align="center">
          Por favor, forneça seu Histórico Escolar para prosseguir
        </Typography>

        <Box padding="4">
          <FileInput onRead={console.log} />
        </Box>

        {/*
          TODO instruções sobre como obter o histórico escolar
          TODO botão para escolher arquivo e enviar requisição por Axios
        */}
      </Box>
    );
  }
}

export default AcademicRecord;
