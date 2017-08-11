import {
  createStyleSheet
} from 'material-ui/styles';
import {
  red,
  yellow,
  green
} from 'material-ui/colors';

const styleSheet = createStyleSheet(theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
  title: {
    flex: '0 0 auto',
  },
  normal: {
    borderLeft: theme.palette.primary[500],
    borderLeftSize: '5px',
    borderLeftStyle: 'solid'
  },
  success: {
    borderLeft: green[500],
    borderLeftSize: '5px',
    borderLeftStyle: 'solid'
  },
  warning: {
    borderLeft: yellow[500],
    borderLeftSize: '5px',
    borderLeftStyle: 'solid'
  },
  error: {
    borderLeft: red[500],
    borderLeftSize: '5px',
    borderLeftStyle: 'solid'
  }
}));
export default styleSheet;
