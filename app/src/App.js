import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Gather from './components/Gather';
import Box from './components/Box';
import Finished from './components/Finished';

const theme = createMuiTheme({

});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Box crossAlign="center" padding="8 4">
            <Route path="/welcome/:token" component={Welcome} />
            <Route path="/gather/:token" component={Gather} />
            <Route path="/finished" component={Finished} />
          </Box>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
