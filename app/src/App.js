import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import primary from '@material-ui/core/colors/deepPurple';
import secondary from '@material-ui/core/colors/pink';
import Welcome from './components/Welcome';
import Gather from './components/Gather';
import Box from './components/Box';
import Finished from './components/Finished';
import ResearchInfo from './components/ResearchInfo';

const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
  },
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
            <Route path="/info" component={ResearchInfo} />
          </Box>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
