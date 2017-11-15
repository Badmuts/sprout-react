import React, { Component } from 'react';
import http from '../../store/http';

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    http.get('/users')
      .then((res) => this.setState({ users: res.data.results}))
  }

  render() {
    const { users } = this.state;
    
    return (
      <div>
        <h1>Top secret! <small>Users</small> </h1>
        <ul>{users.map(this.renderUser)}</ul>
      </div>
    );
  }

  renderUser(user) {
    return (<li key={user.id}>{user.email}</li>)
  }
}

export default Auth;
