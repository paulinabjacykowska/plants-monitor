import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAuth } from '../services/auth';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavigationBar({ LeftTitle }) {
  const classes = useStyles();
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: '#79B877' }}>
          <Typography
            variant="h6"
            style={{ fontWeight: 'bold' }}
            className={classes.title}
          >
            {LeftTitle}
          </Typography>
          {isLoggedIn && (
            <>
              <Button component={Link} to="/plants" color="inherit">
                Rośliny
              </Button>
              <Button component={Link} to="/sensors" color="inherit">
                Czujniki
              </Button>
              <Button color="inherit" onClick={logout}>
                Wyloguj się
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Button component={Link} to="/" color="inherit">
                Start
              </Button>
              <Button component={Link} to="/login" color="inherit">
                Zaloguj się
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Zarejestruj się
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
