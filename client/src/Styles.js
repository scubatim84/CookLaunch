import {makeStyles} from '@material-ui/core/styles';
import LandingImage from './images/landing-bg.png';
import LoginImage from './images/login-bg.png';

export const useStylesMain = makeStyles((theme) => ({
  landingBackground: {
    backgroundImage: `url(${LandingImage})`,
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  loginBackground: {
    backgroundImage: `url(${LoginImage})`,
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(4),
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  landingPosition: {
    padding: '75px 0px 100px 20px',
    marginLeft: '0px',
  },
  menuButton: {
    marginRight: theme.spacing(5),
  },
  root: {
    display: 'flex',
    width: '100%',
  },
  submit: {
    margin: theme.spacing(2, 2, 1),
  },
  title: {
    flexGrow: 1,
  },
}));

export const useStylesForm = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2, 2, 2),
  },
  card: {
    width: 200,
    height: 100,
  },
  list: {
    width: '100%',
    maxHeight: 300,
    overflow: 'auto',
  },
  paper: {
    margin: theme.spacing(2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
}));

export const useStylesFormSubmitMsg = makeStyles(() => ({
  submitMessage: {
    fontSize: '1rem',
    color: '#ff0000',
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const useStylesProfile = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 2),
  },
  field: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  title: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    paddingBottom: theme.spacing(2),
  },
}));
