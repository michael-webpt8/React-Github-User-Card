import React, { Component } from 'react';
import Axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import GithubCard from './components/GithubCard';
import Container from '@material-ui/core/Container';
import './App.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      github: [],
      githubFollowing: []
    };
  }

  componentDidMount() {
    this.gitHubUser('mikeyjwilliams');
  }

  componentDidUpdate(preProps, prevState) {
    if (prevState !== this.state.githubFollowing) {
      this.followerListing(this.state.githubFollowing);
    }
  }

  gitHubUser = () => {
    Axios.get(`https://api.github.com/users/mikeyjwilliams`)
      .then(res =>
        this.setState({
          github: res.data
        })
      )
      .catch(err => console.log('Error', err));
  };

  githubFollowers = () => {
    Axios.get(`https://api.github.com/users/mikeyjwilliams/followers`)
      .then(res =>
        this.setState({
          githubFollowing: res.data.map(user => {
            return user.login;
          })
        })
      )
      .catch(err => console.log('Error ', err));
  };

  followerListing = (following = []) => {
    {
      const userData = following.map(user => this.gitHubUser(user));
      console.log('follow', userData);
    }
  };

  render() {
    return (
      <>
        <CssBaseline />
        <Container maxWidth='lg'>
          <h2 className='text-center'>Github API</h2>
          <GithubCard github={this.state.github} />
        </Container>
      </>
    );
  }
}
export default App;
