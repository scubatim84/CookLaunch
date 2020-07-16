import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';

function RecipeCard(props) {
  const classes = useStylesForm(themeMain);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography color='textPrimary'>{props.name}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>View Recipe</Button>
      </CardActions>
    </Card>
  );
}

export default RecipeCard;
