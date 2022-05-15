import React from 'react';
import { connect } from 'react-redux';

import { userService } from '../service/user.service';
import { login, signup } from '../store/user.action.js';

class _LoginSignupModal extends React.Component {
  state = {
    credentials: userService.getEmptyUser(),
    isSignup: false,
  };

  clearState = () => {
    const clearTemplate = {
      credentials: userService.getEmptyUser(),
      isSignup: false,
    };
    this.setState(clearTemplate);
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ credentials: { ...this.state.credentials, [field]: value } });
  };

  onLogin = (ev) => {
    ev.preventDefault();
    const { credentials } = this.state;
    if (!credentials.username || !credentials.password) return;
    this.props.login(credentials);
    this.clearState();
  };

  onSignup = (ev) => {
    ev.preventDefault();
    const { credentials } = this.state;
    if (!credentials.username || !credentials.password || !credentials.fullname) return;
    this.props.signup(credentials);
    this.clearState();
  };

  toggleSignup = () => {
    this.setState({ isSignup: !this.state.isSignup });
  };

  render() {
    const { username, password, fullname } = this.state.credentials;
    const { isSignup } = this.state;
    return (
      <div className='login-signup-modal'>
        <div className='login-header-container'>
          <div className='close-button'>✖</div>
          <div className='login-title'>Log in or sign up</div>
        </div>

        <div className='login-signup-form'>
          <div className='login-welcome-title'> Welcome to Todos </div>

          {!isSignup && (
            <form className='login-form' onSubmit={this.onLogin}>
              <input
                type='text'
                name='username'
                value={username}
                placeholder='Username'
                onChange={this.handleChange}
                required
                autoFocus
              />
              <input
                type='password'
                name='password'
                value={password}
                placeholder='Password'
                onChange={this.handleChange}
                required
              />
              <button className='submit-button'>Login!</button>
            </form>
          )}

          <div className='signup-section'>
            {isSignup && (
              <form className='signup-form' onSubmit={this.onSignup}>
                <input
                  type='text'
                  name='fullname'
                  value={fullname}
                  placeholder='Fullname'
                  onChange={this.handleChange}
                  required
                />
                <input
                  type='text'
                  name='username'
                  value={username}
                  placeholder='Username'
                  onChange={this.handleChange}
                  required
                />
                <input
                  type='password'
                  name='password'
                  value={password}
                  placeholder='Password'
                  onChange={this.handleChange}
                  required
                />
                <button className='submit-button'>Signup!</button>
              </form>
            )}
          </div>

          <div>New to the todo app?</div>

          <div className='toggle-signup-login-button'>
            <div className='clean-link' onClick={this.toggleSignup}>
              {!isSignup ? 'Create new account' : 'back to Login'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login,
  signup,
};

export const LoginSignupModal = connect(null, mapDispatchToProps)(_LoginSignupModal);
