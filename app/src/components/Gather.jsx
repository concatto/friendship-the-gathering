import React, { Component } from 'react';
import {
  Typography, RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core';
import Box from './Box';

const Question = ({ description, children, ...rest }) => (
  <Box {...rest}>
    <Box padding="0 0 1 0">
      <Typography variant="h5">
        {description}
      </Typography>
    </Box>
    {children}
  </Box>
);

const Option = ({ ...rest }) => (
  <FormControlLabel control={<Radio />} {...rest} />
);

class Gather extends Component {
  render() {
    const { name, id } = this.props;

    return (
      <Box>
        <Box padding="4 0">
          <Typography variant="h2">
            {name}
          </Typography>
        </Box>
        <Question description="Qual o seu nível de amizade com esta pessoa?">
          <RadioGroup>
            <Option value="0" label="0 - Não conheço" />
            <Option value="1" label="1 - Sei quem é, mas não conversamos" />
            <Option value="2" label="2 - Conversamos de vez em quando" />
            <Option value="3" label="3 - Amigo(a) próximo(a), conversamos com certa frequência" />
            <Option value="4" label="4 - Melhor amigo(a), conversamos quase todo dia" />
          </RadioGroup>
        </Question>
        <Box />
      </Box>
    );
  }
}

export default Gather;
