import React from 'react';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { withRouter } from 'react-router-dom';
import { SIGNIN_USER } from '../../queries';

class Signin extends React.Component {
  state = {
    username: '',
    password: ''
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = (e, signinUser) => {
    e.preventDefault();
    signinUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signinUser.token);
      await this.props.refetch();
      this.setState({
        username: '',
        password: ''
      });
      this.props.history.push('/');
    });
  };

  validateForm() {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className='App'>
        <h2 className='App'>Signin</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <form
                className='form'
                onSubmit={event => this.handleSubmit(event, signinUser)}
              >
                <input
                  type='text'
                  name='username'
                  value={username}
                  placeholder='Username'
                  onChange={this.handleChange}
                />
                <input
                  type='password'
                  name='password'
                  value={password}
                  placeholder='Password'
                  onChange={this.handleChange}
                />
                <button
                  type='submit'
                  disabled={loading || this.validateForm()}
                  onSubmit={this.handleSubmit}
                  className='button-primary'
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signin);
