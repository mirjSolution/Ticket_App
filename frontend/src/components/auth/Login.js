import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, role }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated && role === 'admin') {
    return <Redirect to='/dashboard' />;
  }

  if (isAuthenticated && role === 'user') {
    return <Redirect to='/events' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary login'>Login</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Login Into Your Account
      </p>
      <p>Username: admin@admin.com</p>
      <p>Password: 123456</p>
      <a href='https://github.com/mirjSolution/Ticket_App'>
        <p>GitHub Link</p>
      </a>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Forgot Password?{' '}
        <Link to='/forgot'>
          {' '}
          <span style={{ borderBottom: '2px solid black' }}>Forgot</span>{' '}
        </Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  role: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps, { login })(Login);
