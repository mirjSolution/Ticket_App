import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Reset = (props) => {
  return (
    <Fragment>
      <h1 className='medium text-primary'>RESET PASSWORD</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Enter Password
      </p>
      <Form className='form' onSubmit={resetHandler}>
        <div className='form-group'>
          <Input
            id='password'
            element='input'
            type='password'
            placeholder='Password'
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText='Minimum length 8'
            onInput={inputHandler}
          />
          <Input
            id='confirmPassword'
            element='input'
            type='password'
            placeholder='Confirm Password'
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText='Minimum length 8'
            onInput={inputHandler}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Submit' />
      </Form>
      <p className='my-1'>
        Reset token already expired?{' '}
        <Link to={'/forgot'}>
          {' '}
          <span style={{ borderBottom: '2px solid black' }}>
            Forgot Password
          </span>{' '}
        </Link>
      </p>
    </Fragment>
  );
};

Reset.propTypes = {};

export default Reset;
