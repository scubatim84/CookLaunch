import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';
import theme from './Theme';

import {ThemeProvider} from '@material-ui/core/styles';

import Dashboard from './components/layout/Dashboard';
import Landing from './components/layout/Landing';
import Login from './components/layout/Login';
import Navbar from './components/layout/Navbar';
import ForgotPassword from './components/layout/ForgotPassword';

function App() {
  // Initial check to see if user is logged in
  const token = cookies.get('user');

  const [isLoggedIn, setLoggedIn] = useState(!isEmpty(token));

  const handleLoggedIn = async (loggedIn) => {
    if (loggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const renderDashboard = () => {
    return <Dashboard isLoggedIn={isLoggedIn} />;
  };

  const renderLanding = () => {
    return <Landing handleLoggedIn={handleLoggedIn} isLoggedIn={isLoggedIn} />;
  };

  const renderLogin = () => {
    return <Login handleLoggedIn={handleLoggedIn} isLoggedIn={isLoggedIn} />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar handleLoggedIn={handleLoggedIn} isLoggedIn={isLoggedIn} />
      <Router>
        <div className='App'>
          <Route exact path='/' render={renderLanding} />
          <Route exact path='/login' render={renderLogin} />
          <Route exact path='/dashboard' render={renderDashboard} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
