import React from 'react';
import User from './User';

export default function UserList(props) {
  return (
    <div>
      <h1> Users list </h1>
      {props.users.length ?
        props.users.map(item => <User removeUser={props.removeUser} data={item}/>) :
        <p>Currently there is not any user (use form above to add some)</p>
      }
    </div>
  )
}
