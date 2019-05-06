import React from 'react';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { SIGNUP_USER } from '../../queries';
import { withRouter } from 'react-router-dom';

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    formValidated: false
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = (e, signupUser) => {
    e.preventDefault();
    signupUser().then(async ({ data }) => {
      
      localStorage.setItem('token', data.signupUser.token);
      await this.props.refetch();
      this.setState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        formValidated: true
      });
      this.props.history.push('/');
    });
  };

  validateForm() {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className='App'>
        <h2 className='App'>Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {
            return (
              <form
                className='form'
                onSubmit={event => this.handleSubmit(event, signupUser)}
              >
                <input
                  type='text'
                  name='username'
                  value={username}
                  placeholder='Username'
                  onChange={this.handleChange}
                />
                <input
                  type='email'
                  name='email'
                  value={email}
                  placeholder='Email Address'
                  onChange={this.handleChange}
                />
                <input
                  type='password'
                  name='password'
                  value={password}
                  placeholder='Password'
                  onChange={this.handleChange}
                />
                <input
                  type='password'
                  name='passwordConfirmation'
                  value={passwordConfirmation}
                  placeholder='Confirm Password'
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
                {this.state.formValidated && <p>Thank you for signing up!</p>}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signup);
