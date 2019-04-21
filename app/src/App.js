import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './components/Welcome';

const theme = createMuiTheme({

});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route path="/welcome/:token" component={Welcome} />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
