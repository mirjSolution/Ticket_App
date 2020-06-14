import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Forgot = (props) => {
  return (
    <Fragment>
      <h1 className='medium text-primary'>FORGOT PASSWORD</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Enter Your Email Address
      </p>
      <form className='form'>
        <div className='form-group'>
          <input id='email' type='text' placeholder='Email' />
        </div>

        <input type='submit' className='btn btn-primary' value='Submit' />
      </form>
      <p className='my-1'>
        Don't have an account?{' '}
        <Link to={'/register'}>
          {' '}
          <span style={{ borderBottom: '2px solid black' }}>Register</span>{' '}
        </Link>
      </p>
    </Fragment>
  );
};

Forgot.propTypes = {};

export default Forgot;
