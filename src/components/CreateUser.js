import React from 'react';
import { Fragment } from 'react';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      title: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.addUserClicked = this.addUserClicked.bind(this);
  }

  handleChange(prop, value) {
    const newUser = {};
    newUser[prop] = value;
    this.setState({ ...newUser });
  }

  addUserClicked() {
    this.props.addUser(this.state);
    this.resetForm();
  }

  resetForm() {
    this.setState({
      name: '',
      title: ''
    });
  }

  render() {
    return (
      <Fragment>
        <div className="form-create-user">
          <h2>Add user</h2>
            <label>
              Name &nbsp;
              <input type="text"
                name="name"
                value={this.state.name}
                onChange={(e) => {this.handleChange('name', e.target.value)}}
              />
            </label>&nbsp;
            <label>
              Title &nbsp;
              <input type="text"
                name="title"
                value={this.state.title}
                onChange={(e) => {this.handleChange('title', e.target.value)}}
              />
            </label>&nbsp;
          <button
            disabled={this.state.error}
            onClick={this.addUserClicked}
          >
            Add user
          </button>
        </div>
      </Fragment>
    );
  }
}


export default CreateUser
