import React from 'react';

export default class User extends React.Component {
  render() {
    return (
      <div className="user_block">
        <span className="name"><b>name:</b> {this.props.data.name}</span>&nbsp;
        <span className="title"><b>title: </b> {this.props.data.title}</span>&nbsp;
        <button onClick={() => { this.props.removeUser(this.props.data._id) }}>Remove Employee</button>
      </div>
    )
  }
}
