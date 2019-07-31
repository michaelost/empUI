import React from 'react';
import { Fragment } from 'react';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      name: '',
      title: '',

    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(prop, value) {
    const newUser = {};
    newUser[prop] = value;
    this.setState({ ...newUser });
  }

  validate(users) {
    const { name, title } = this.state;
    if (!name || !title) {
      this.setState({ error: 'missing input' });
    }
  }

  resetForm() {
    this.setState({
      name: '',
      title: '',
      error: null
    });
  }

  render() {
    return (
      <Fragment>
        <div className="form-create-user">
          <h2>Add user</h2>
            <label>
              Name
              <input type="text"
                name="name"
                value={this.state.name}
                onChange={(e) => {this.handleChange('name', e.target.value)}}
              />
            </label>
            <label>
              Title 
              <input type="text"
                name="title"
                value={this.state.title}
                onChange={(e) => {this.handleChange('title', e.target.value)}}
              />
            </label>
            <div className="style-error">{this.state.error}</div>
          <button
            disabled={this.state.error}
            onClick={() => {
              this.props.addUser(this.state);
              this.resetForm();
              }
            }
          >
            Add user
          </button>
        </div>
      </Fragment>
    );
  }
}


export default CreateUser
