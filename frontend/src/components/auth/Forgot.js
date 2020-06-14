import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgot } from '../../actions/auth';

const Forgot = ({ forgot, history }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    forgot(email);
    setFormData({ email: '' });
  };

  return (
    <Fragment>
      <h1 className='medium text-primary'>FORGOT PASSWORD</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Enter Your Email Address
      </p>
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

Forgot.propTypes = {
  forgot: PropTypes.func.isRequired,
};

export default connect(null, { forgot })(Forgot);
