import React from 'react';
import { Grid, List } from '@material-ui/core';

import toTitleCase from '../../actions/toTitleCase';
import useStylesMain from '../../Styles';
import { themeMain } from '../../Theme';
import IngredientNameItem from './IngredientNameItem';

const IngredientNameList = (props) => {
  const classes = useStylesMain(themeMain);

  return (
    <List className={classes.list}>
      {props.ingredientList.data.map((ingredient) => (
        <Grid item xs={12} key={ingredient.name + ingredient.dateLastChanged}>
          <IngredientNameItem
            key={ingredient.name + ingredient.dateLastChanged}
            createdBy={ingredient.createdBy}
            userId={props.userId}
            id={ingredient._id}
            name={toTitleCase(ingredient.name)}
            getIngredientData={props.getIngredientData}
            handleDelete={props.handleDelete}
          />
        </Grid>
      ))}
    </List>
  );
};

export default IngredientNameList;
