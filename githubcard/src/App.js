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
      github: []
    };
  }

  componentDidMount() {
    this.gitHubUser('mikeyjwilliams');
  }

  gitHubUser = name => {
    Axios.get(`https://api.github.com/users/${name}`)
      .then(res =>
        this.setState({
          github: res.data
        })
      )
      .catch(err => console.log('Error', err));
  };

  render() {
    console.log('data', this.state.github);
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
