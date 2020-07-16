import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';
import Dashboard from './components/Dashboard';
import Pantry from './components/Pantry';
import Profile from './components/Profile/Profile';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPasswordByEmail from './components/Auth/ResetPasswordByEmail';
import {getUserData} from './actions/userActions';
import {getIngredients} from './actions/ingredientActions';
import {useStylesMain} from './Styles';
import {themeMain} from './Theme';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {getAllRecipes} from './actions/recipeActions';
import RecipeAdd from './components/Recipes/RecipeAdd';
import Grid from '@material-ui/core/Grid';
import IngredientNames from './components/Ingredients/IngredientNames';

function App() {
  const classes = useStylesMain(themeMain);

  // Initial check to see if user is logged in
  const token = cookies.get('user');

  const [isLoggedIn, setLoggedIn] = useState(!isEmpty(token));
  const [user, setUser] = useState({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    pantry: [],
  });
  const [ingredients, setIngredients] = useState({data: []});
  const [recipes, setRecipes] = useState({data: []});

  const getIngredientData = async () => {
    const response = await getIngredients();

    setIngredients({data: response.authResponsePayload});
  };

  const getRecipeData = async () => {
    const response = await getAllRecipes();

    setRecipes({data: response.data});
  };

  const getUserPayload = async () => {
    const requestResponse = await getUserData();

    setUser({
      id: requestResponse.authResponsePayload._id,
      email: requestResponse.authResponsePayload.email,
      firstName: requestResponse.authResponsePayload.firstName,
      lastName: requestResponse.authResponsePayload.lastName,
      pantry: requestResponse.authResponsePayload.pantry,
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
      getRecipeData();
    }
  }, [isLoggedIn]);

  const renderDashboard = () => {
    return (
      <Dashboard
        key={isLoggedIn}
        id={user.id}
        email={user.email}
        firstName={user.firstName}
        lastName={user.lastName}
        handleLoggedIn={handleLoggedIn}
        isLoggedIn={isLoggedIn}
        className={classes.root}
      />
    );
  };

  const renderRecipeAdd = () => {
    return (
      <Grid container justify='center'>
        <Grid item xs={12} sm={8}>
          <RecipeAdd
            key={recipes.data}
            getRecipeData={getRecipeData}
            ingredients={ingredients.data}
          />
        </Grid>
      </Grid>
    );
  };
  const renderIngredients = () => {
    return (
      <Grid container justify='center'>
        <Grid item xs={12} sm={6} md={4}>
          <IngredientNames
            key={ingredients.data}
            getIngredientData={getIngredientData}
            ingredients={ingredients.data}
            id={user.id}
            email={user.email}
            firstName={user.firstName}
            lastName={user.lastName}
            handleLoggedIn={handleLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        </Grid>
      </Grid>
    );
  };

  const renderLanding = () => {
    return (
      <Landing
        handleLoggedIn={handleLoggedIn}
        isLoggedIn={isLoggedIn}
        className={classes.root}
      />
    );
  };

  const renderLogin = () => {
    return (
      <Login
        handleLoggedIn={handleLoggedIn}
        isLoggedIn={isLoggedIn}
        className={classes.root}
      />
    );
  };

  const renderPantry = () => {
    return (
      <Pantry
        key={user.pantry}
        pantry={user.pantry}
        ingredients={ingredients.data}
        getUserPayload={getUserPayload}
        getIngredientData={getIngredientData}
        email={user.email}
        firstName={user.firstName}
        lastName={user.lastName}
        handleLoggedIn={handleLoggedIn}
        isLoggedIn={isLoggedIn}
        className={classes.root}
      />
    );
  };

  const renderResetPassword = () => {
    return (
      <ResetPasswordByEmail
        handleLoggedIn={handleLoggedIn}
        isLoggedIn={isLoggedIn}
        className={classes.root}
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
        className={classes.root}
      />
    );
  };

  return (
    <ThemeProvider theme={themeMain}>
      <CssBaseline />
      <Navbar
        handleLoggedIn={handleLoggedIn}
        isLoggedIn={isLoggedIn}
        className={classes.root}
      />
      <Router>
        <div className='App'>
          <Route exact path='/' render={renderLanding} />
          <Route exact path='/login' render={renderLogin} />
          <Route exact path='/dashboard' render={renderDashboard} />
          <Route exact path='/ingredients' render={renderIngredients} />
          <Route exact path='/recipes/add' render={renderRecipeAdd} />
          <Route exact path='/dashboard/pantry' render={renderPantry} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
          <Route exact path='/profile' render={renderProfile} />
          <Route path='/reset/:token' render={renderResetPassword} />
        </div>
      </Router>
      <Footer className={classes.root} />
    </ThemeProvider>
  );
}

export default App;
