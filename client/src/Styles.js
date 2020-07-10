import {makeStyles} from '@material-ui/core/styles';

export const useStylesForm = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(2),
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
  submit: {
    margin: theme.spacing(2),
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

export const useStylesLanding = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  position: {
    padding: '125px 0px 100px 20px',
    marginLeft: '0px',
  },
}));

export const useStylesNavbar = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const useStylesFooter = makeStyles((theme) => ({
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
