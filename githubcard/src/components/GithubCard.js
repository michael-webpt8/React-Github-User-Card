import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GroupIcon from '@material-ui/icons/Group';
import { loadCSS } from 'fg-loadcss';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function GithubCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(props.github);
  }, [props.github]);

  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log('user', user);

  const firstLetter = (letter = '') => {
    const word = letter.slice(0, 1).toUpperCase();
    return word;
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {firstLetter(user.name)}
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={user.name}
          subheader={user.login}
        />
        <CardMedia
          className={classes.media}
          image={user.avatar_url}
          title={user.name}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            Location: {user.location}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <a href={user.html_url}>
            <IconButton aria-label='Github'>
              <Icon className='fab fa-github fa-2x' color='primary' />
            </IconButton>
          </a>

          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>{user.bio}</Typography>
            <Typography paragraph>Followers: {user.followers}</Typography>
            <Typography paragraph>Following: {user.following}</Typography>
            <Typography paragraph>Public Repos: {user.public_repos}</Typography>
            <Typography paragraph>Public Gist: {user.public_gists}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
export default GithubCard;
