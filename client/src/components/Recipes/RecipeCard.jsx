import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import {useStylesForm} from '../../Styles';
import {themeMain} from '../../Theme';

function RecipeCard(props) {
  const classes = useStylesForm(themeMain);

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card className={classes.card}>
        <CardContent>
          <Typography color='textPrimary'>{props.name}</Typography>
        </CardContent>
        <CardActions>
          <Link
            href={`/recipes/view/${props.id}`}
            color='textPrimary'
            style={{textDecoration: 'none'}}
          >
            <Button size='small'>View Recipe</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default RecipeCard;
