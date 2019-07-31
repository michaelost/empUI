import React from 'react';

export default class User extends React.Component {
  render() {
    return (
      <div className="user_block">
        <h1 className="name">{this.props.data.name}</h1>
        <span className="title">{this.props.data.title}</span>
        <button onClick={() => { this.props.removeUser(this.props.data._id) }}>Remove Employee</button>
      </div>
    )
  }
}
