import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {getUserData} from '../../actions/authActions';

function Ingredients(props) {
  const [isLoggedIn, setLoggedIn] = useState(props.isLoggedIn);
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    setLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const getUserPayload = async () => {
        const data = await getUserData();
        const userPayload = await data.payload;

        setUser({
          email: userPayload.email,
          firstName: userPayload.firstName,
          lastName: userPayload.lastName,
        });
      };

      getUserPayload();
    }
  }, [isLoggedIn]);

  return !isLoggedIn ? <Redirect to='/login' /> : <div></div>;
}

export default Ingredients;

/*
Notes:

Will be a modal

Need form and input text box to type in ingredient name, a list for quantity type (preset values from list like Ounces, Grams, etc.), and then a button to add ingredient and another button to close modal

Form on bottom, on top have a fixed size list that shows current ingredients, which will need to do a GET from API to get list of ingredients in DB, this way user can view before deciding to add or not
*/
