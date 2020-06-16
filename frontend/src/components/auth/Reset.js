import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reset } from '../../actions/auth';

const Reset = ({ reset, match, history }) => {
  const [formData, setFormData] = useState({
    password: '',
  });

  const { password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    reset(password, match.params.resettoken, history);
  };

  return (
    <Fragment>
      <h1 className='medium text-primary'>RESET PASSWORD</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Enter Desired Password
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
            required
          />
          <input
            type='password'
            placeholder='Confirm Password'
            minLength='6'
            required
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Submit' />
      </form>
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

Reset.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default connect(null, { reset })(Reset);
