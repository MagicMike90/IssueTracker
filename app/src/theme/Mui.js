import React from 'react';
import {
  createMuiTheme
} from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import Blue from 'material-ui/colors/blue';

const theme = createMuiTheme({
  palette: createPalette({
    primary: Blue, // Purple and green play nicely together
    // accent: Blue
  }),
});
export default theme;
