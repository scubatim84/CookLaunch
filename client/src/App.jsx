import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';
import Dashboard from './components/Dashboard';
import Pantry from './components/Pantry/Pantry';
import Profile from './components/Profile/Profile';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPasswordByEmail from './components/Auth/ResetPasswordByEmail';
import {getUserData} from './actions/userActions';
import {themeMain} from './Theme';
import {ThemeProvider} from '@material-ui/core/styles';
import {getIngredients} from './actions/ingredientActions';

function App() {
  // Initial check to see if user is logged in
  const token = cookies.get('user');

  const [isLoggedIn, setLoggedIn] = useState(!isEmpty(token));
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [ingredients, setIngredients] = useState({data: []});

  const getIngredientData = async () => {
    const response = await getIngredients();

    setIngredients({data: response.authResponsePayload});
  };

  const getUserPayload = async () => {
    const requestResponse = await getUserData();

    setUser({
      email: requestResponse.authResponsePayload.email,
      firstName: requestResponse.authResponsePayload.firstName,
      lastName: requestResponse.authResponsePayload.lastName,
    });
  };

  const handleLoggedIn = async (loggedIn) => {
    if (loggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserPayload();
      getIngredientData();
    }
  }, [isLoggedIn]);

  const renderDashboard = () => {
    return (
      <Dashboard
        key={isLoggedIn}
        getIngredientData={getIngredientData}
        ingredients={ingredients.data}
        email={user.email}
        firstName={user.firstName}
        lastName={user.lastName}
        handleLoggedIn={handleLoggedIn}
        isLoggedIn={isLoggedIn}
      />
    );
  };

  const renderLanding = () => {
    return <Landing handleLoggedIn={handleLoggedIn} isLoggedIn={isLoggedIn} />;
  };

  const renderLogin = () => {
    return <Login handleLoggedIn={handleLoggedIn} isLoggedIn={isLoggedIn} />;
  };

  const renderPantry = () => {
    return <Pantry handleLoggedIn={handleLoggedIn} isLoggedIn={isLoggedIn} />;
  };

  const renderResetPassword = () => {
    return (
      <ResetPasswordByEmail
        handleLoggedIn={handleLoggedIn}
        isLoggedIn={isLoggedIn}
      />
    );
  };

  const renderProfile = () => {
    return (
      <Profile
        key={user.email}
        getUserPayload={getUserPayload}
        email={user.email}
        firstName={user.firstName}
        lastName={user.lastName}
        isLoggedIn={isLoggedIn}
      />
    );
  };

  return (
    <ThemeProvider theme={themeMain}>
      <Navbar handleLoggedIn={handleLoggedIn} isLoggedIn={isLoggedIn} />
      <Router>
        <div className='App'>
          <Route exact path='/' render={renderLanding} />
          <Route exact path='/login' render={renderLogin} />
          <Route exact path='/dashboard' render={renderDashboard} />
          <Route exact path='/dashboard/pantry' render={renderPantry} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
          <Route exact path='/profile' render={renderProfile} />
          <Route path='/reset/:token' render={renderResetPassword} />
        </div>
      </Router>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
