import {makeStyles} from '@material-ui/core/styles';
import LandingImage from './images/landing-bg.png';
import LoginImage from './images/login-bg.png';

export const useStylesMain = makeStyles((theme) => ({
  buttonMarginTop: {
    marginTop: theme.spacing(1),
  },
  buttonMargin: {
    marginBottom: theme.spacing(1),
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'sticky',
    bottom: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  formSubmitMessage: {
    fontSize: '1rem',
    color: '#ff0000',
    display: 'flex',
    justifyContent: 'center',
  },
  ingredientMargin: {
    marginTop: theme.spacing(2),
  },
  landingBackground: {
    backgroundImage: `url(${LandingImage})`,
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  landingPosition: {
    padding: '75px 0px 100px 20px',
    marginLeft: '0px',
  },
  loginBackground: {
    backgroundImage: `url(${LoginImage})`,
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  list: {
    width: '100%',
    maxHeight: 300,
    overflow: 'auto',
    marginBottom: theme.spacing(1),
  },
  listRecipeAdd: {
    width: '100%',
    maxHeight: 200,
    overflow: 'auto',
  },
  minHeight: {
    minHeight: '100vh',
  },
  maxWidth: {
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(5),
  },
  pageCard: {
    marginTop: theme.spacing(1),
  },
  pageMargin: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  pageMarginBottom: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  recipeCard: {
    minHeight: 100,
    minWidth: 200,
    margin: theme.spacing(2, 2, 2),
  },
  root: {
    display: 'flex',
  },
  submit: {
    margin: theme.spacing(2, 2, 1),
  },
  title: {
    marginBottom: theme.spacing(1),
    flexGrow: 1,
  },
}));
