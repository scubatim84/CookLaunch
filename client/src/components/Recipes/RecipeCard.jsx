import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
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
        <Link
          href={`/recipes/${props.id}`}
          color='textPrimary'
          style={{textDecoration: 'none'}}
        >
          <Button size='small'>View Recipe</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default RecipeCard;
