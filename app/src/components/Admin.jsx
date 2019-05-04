import React, { Component } from 'react';
import {
  TextField, MenuItem, FormControl, InputLabel, Select, Button, Typography,
} from '@material-ui/core';
import { getSocialGroups, registerPerson, generateEmailsForGroup } from '../database';
import Box from './Box';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupEmail: 0,
      groups: [],
      values: {
        socialGroup: 0,
      },
    };
  }

  componentDidMount() {
    getSocialGroups().then(groups => this.setState({ groups }));
  }

  setValue(field, value) {
    const { values } = this.state;
    this.setState({ values: { ...values, [field]: value } });
  }

  submit(event) {
    event.preventDefault();

    const { values, groups } = this.state;
    const { name, email, socialGroup } = values;

    registerPerson(name, email, groups[socialGroup]).then(console.log);
  }

  generateEmails() {
    const { groupEmail, groups } = this.state;

    generateEmailsForGroup(groups[groupEmail]);
  }

  render() {
    const { values, groups, groupEmail } = this.state;

    const options = groups.map((group, i) => (
      <MenuItem value={i} key={group.id}>{group.data().name}</MenuItem>
    ));

    return (
      <Box direction="row" width="100%" mainAlign="space-evenly">
        <Box>
          <form onSubmit={e => this.submit(e)}>

            <Box direction="column">
              <TextField
                value={values.name || ''}
                onChange={e => this.setValue('name', e.target.value)}
                label="Nome"
                id="name"
              />

              <Box padding="1 0" />

              <TextField
                value={values.email || ''}
                onChange={e => this.setValue('email', e.target.value)}
                label="E-mail"
                type="email"
                id="email"
              />

              <Box padding="2 0" />

              <FormControl>
                <InputLabel htmlFor="social-group">Grupo social</InputLabel>
                <Select
                  value={values.socialGroup}
                  onChange={e => this.setValue('socialGroup', e.target.value)}
                  inputProps={{
                    name: 'socialGroup',
                    id: 'social-group',
                  }}
                >
                  {options}
                </Select>
              </FormControl>

              <Box padding="3 0" />

              <Button type="submit" color="primary" variant="contained">
              Registrar
              </Button>
            </Box>
          </form>
        </Box>

        <Box>
          <Typography variant="h4" gutterBottom>
            Gerar e-mails
          </Typography>

          <Box padding="2 0" />

          <FormControl>
            <InputLabel htmlFor="social-group-emails">Grupo social</InputLabel>
            <Select
              value={groupEmail}
              onChange={e => this.setState({ groupEmail: e.target.value })}
              inputProps={{
                name: 'groupEmail',
                id: 'social-group-emails',
              }}
            >
              {options}
            </Select>
          </FormControl>
          <Box padding="3 0" />
          <Button color="secondary" variant="contained" onClick={() => this.generateEmails()}>
          Gerar
          </Button>
        </Box>
      </Box>
    );
  }
}

export default Admin;
