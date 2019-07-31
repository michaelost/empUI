import React from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config'
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.removeUser = this.removeUser.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  state = {
    users: [],
    token: null
  }


  componentDidMount() {
    console.log('config', config);
    fetch(`${config.EMPLOYEE_SERVER_URL}/users`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          users: response,
        })
      })
      .catch(err => {
        alert(err.message);
      })
  }

  checkResponse(response) {
    if (response.result ===  'unauthorized') {
      throw new Error('403 - unauthorized');
    }
  }

  removeUser(_id) {
    const url = `${config.EMPLOYEE_SERVER_URL}/users/${_id}`;
    console.log('url', url)
    fetch(`${config.EMPLOYEE_SERVER_URL}/users/${_id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(response => {
        this.checkResponse(response)
        this.setState({
          users: this.state.users.filter(user => user._id !== _id)
        })
      })
      .catch(error => {
        alert(error.message);
        this.setState({
          error,
        });
      })

  }

  addUser(user) {
    fetch(`${config.EMPLOYEE_SERVER_URL}/users`, { method: 'POST' })
      .then(response => response.json())
      .then(response => {
        this.checkResponse(response)
        this.setState({
          users: this.state.users.concat([ user ])
        })
      })
      .catch(error => {
        alert(error.message);
        this.setState({
          error,
        });
      })
  }

  render() {
    return (
      <div className="App">
        {!this.state.token &&
          <div className="no token">
            <p> Currently you dont have access token, so you can see that adding and removing user and doesn't work</p>
          </div>
        }
      <CreateUser addUser={this.addUser} />
      <UserList removeUser={this.removeUser} users={this.state.users}  />
      </div>
    );
  }
}

export default App;
