import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import isEmpty from 'is-empty';
import cookies from 'js-cookie';
import _ from 'lodash';
import Dashboard from './components/Dashboard';
import Pantry from './components/Pantry';
import Profile from './components/Profile/Profile';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPasswordByEmail from './components/Auth/ResetPasswordByEmail';
import { getUserData } from './actions/userActions';
import { getIngredients } from './actions/ingredientActions';
import { useStylesMain } from './Styles';
import { themeMain } from './Theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getAllRecipes } from './actions/recipeActions';
import RecipeAdd from './components/Recipes/RecipeAdd';
import Grid from '@material-ui/core/Grid';
import IngredientNames from './components/Ingredients/IngredientNames';
import RecipeExpanded from './components/Recipes/RecipeExpanded';
import GroceryList from './components/GroceryList';
import Welcome from './components/Welcome';

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
    groceries: [],
  });
  const [ingredients, setIngredients] = useState({ data: [] });
  const [recipes, setRecipes] = useState(undefined);

  const getIngredientData = useCallback(async () => {
    const response = await getIngredients();

    const ingredients = response.data.map((ingredient) => {
      return {
        ...ingredient,
        name: _.startCase(_.toLower(ingredient.name)),
      };
    });

    setIngredients({ data: ingredients });
  }, []);

  const getRecipeData = useCallback(async () => {
    const response = await getAllRecipes();

    setRecipes(response.data);
  }, []);

  const getUserPayload = useCallback(async () => {
    const requestResponse = await getUserData();

    setUser({
      id: requestResponse.authResponsePayload._id,
      email: requestResponse.authResponsePayload.email,
      firstName: requestResponse.authResponsePayload.firstName,
      lastName: requestResponse.authResponsePayload.lastName,
      pantry: requestResponse.authResponsePayload.pantry,
      groceries: requestResponse.authResponsePayload.groceries,
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserPayload();
      getIngredientData();
      getRecipeData();
    }
  }, [isLoggedIn, getUserPayload, getIngredientData, getRecipeData]);

  const handleLoggedIn = (loggedIn) => {
    if (loggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const renderDashboard = () => {
    return (
      <Dashboard
        key={isLoggedIn}
        id={user.id}
        email={user.email}
        firstName={user.firstName}
        lastName={user.lastName}
        recipes={recipes}
        handleLoggedIn={handleLoggedIn}
        isLoggedIn={isLoggedIn}
        className={classes.root}
      />
    );
  };

  const renderRecipeAdd = () => {
    return (
      <Grid
        container
        style={{ minHeight: '100vh' }}
        className={classes.ingredientMargin}
      >
        <Grid item xs={12} align='center'>
          <RecipeAdd
            key={recipes}
            getRecipeData={getRecipeData}
            ingredients={ingredients.data}
            isLoggedIn={isLoggedIn}
          />
        </Grid>
      </Grid>
    );
  };

  const renderRecipeView = ({ match }) => {
    if (recipes) {
      const foundRecipe = recipes.filter((recipe) => {
        return recipe._id === match.params.id;
      });

      return (
        <RecipeExpanded
          key={foundRecipe[0]?._id + foundRecipe[0]?.dateLastChanged}
          recipeId={foundRecipe[0]?._id}
          isLoggedIn={isLoggedIn}
          imageUrl={foundRecipe[0]?.imageUrl}
          getRecipeData={getRecipeData}
          ingredients={ingredients.data}
          groceries={user.groceries}
          pantry={user.pantry}
          getUserPayload={getUserPayload}
        />
      );
    }
  };

  const renderIngredients = () => {
    return (
      <Grid
        container
        style={{ minHeight: '100vh' }}
        className={classes.ingredientMargin}
      >
        <Grid item xs={12} align='center'>
          <IngredientNames
            key={ingredients.data}
            pantry={user.pantry}
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

  const renderWelcome = () => {
    return (
      <Welcome
        key={isLoggedIn}
        firstName={user.firstName}
        handleLoggedIn={handleLoggedIn}
        isLoggedIn={isLoggedIn}
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
      <Grid
        container
        style={{ minHeight: '100vh' }}
        className={classes.ingredientMargin}
      >
        <Grid item xs={12} align='center'>
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
        </Grid>
      </Grid>
    );
  };

  const renderGroceries = () => {
    return (
      <Grid
        container
        style={{ minHeight: '100vh' }}
        className={classes.ingredientMargin}
      >
        <Grid item xs={12} align='center'>
          <GroceryList
            key={user.groceries}
            groceries={user.groceries}
            pantry={user.pantry}
            ingredients={ingredients.data}
            getUserPayload={getUserPayload}
            getIngredientData={getIngredientData}
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
          <Route exact path='/welcome' render={renderWelcome} />
          <Route exact path='/ingredients' render={renderIngredients} />
          <Route exact path='/recipes/add' render={renderRecipeAdd} />
          <Route exact path='/recipes/view/:id' render={renderRecipeView} />
          <Route exact path='/dashboard/groceries' render={renderGroceries} />
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
