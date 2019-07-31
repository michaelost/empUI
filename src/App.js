import React from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config'
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

const formatRequest = (data) => ({
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.removeUser = this.removeUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  state = {
    users: [],
    token: null
  }

  componentDidMount() {
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


  getAccessToken() {
    fetch(`${config.AUTH_SERVER_URL}/login`, {
      method: 'POST',
      ...formatRequest({ username: 'mi', password: '123' })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ token: response.user.token });
      })
      .catch(err => {
        alert(err.message);
      })
  }

  removeUser(_id) {
    fetch(`${config.EMPLOYEE_SERVER_URL}/users/${_id}`, {
      method: 'DELETE',
      ...formatRequest({ token: this.state.token })
    })
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
    fetch(`${config.EMPLOYEE_SERVER_URL}/users`, {
      method: 'POST',
      ...formatRequest({
        ...user,
        token: this.state.token,
      })
    })
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
            <p> to get your access token please press button </p>
            <p> after that you can remove/add users </p>
            <button onClick={this.getAccessToken}>
              get access token
            </button>
          </div>
        }
      <CreateUser addUser={this.addUser} />
      <UserList removeUser={this.removeUser} users={this.state.users}  />
      </div>
    );
  }
}

export default App;
