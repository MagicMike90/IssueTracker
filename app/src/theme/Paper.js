import {
  createStyleSheet
} from 'material-ui/styles';
import {
  red,
  yellow,
  green
} from 'material-ui/colors';

const styleSheet = createStyleSheet(theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    width: 320
  }),
  title: {
    flex: '0 0 auto',
  },
  normal: {
    borderLeft: theme.palette.primary[500],
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid'
  },
  success: {
    borderLeft: green[500],
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid'
  },
  warning: {
    borderLeft: yellow[500],
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid'
  },
  error: {
    borderLeft: red[500],
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid'
  }
}));
export default styleSheet;
