import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { themeMain } from '../../Theme';
import defaultImage from '../../images/defaultrecipeimage.jpg';

function RecipeCard(props) {
  const classes = useStyles(themeMain);

  return (
    <Card className={classes.recipeCard}>
      <CardContent>
        <Typography color='textPrimary'>{props.name}</Typography>
      </CardContent>
      <CardMedia
        className={classes.media}
        image={props.imageUrl ? props.imageUrl : defaultImage}
        title={props.name}
      />
      <CardActions>
        <Link
          href={`/recipes/view/${props.id}`}
          color='textPrimary'
          style={{ textDecoration: 'none' }}
        >
          <Button size='small'>View Recipe</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  media: {
    height: 'auto',
    width: '100%',
    paddingTop: '56.25%', // 16:9
  },
  recipeCard: {
    minHeight: 100,
    minWidth: 200,
    margin: theme.spacing(2, 2, 2),
  },
}));

export default RecipeCard;
