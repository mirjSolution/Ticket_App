import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({
  auth: { userId, isAuthenticated, loading, role, name },
  logout,
}) => {
  const adminLinks = (
    <ul className={role}>
      <li>
        <Link to='/events'>Events</Link>
      </li>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link to={`/purchases`}>Purchases</Link>
      </li>
      <li>
        <Link to='/' onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );

  const userLinks = (
    <ul className={role}>
      <li>
        <Link to='/events'>Events</Link>
      </li>
      <li>
        <Link to={`/orders/${userId}`}>History</Link>
      </li>

      <li>
        <Link to='/' onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/events'>Events</Link>
      </li>
      {!isAuthenticated ? (
        <Fragment>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </Fragment>
      ) : (
        <li>
          <Link to='/' onClick={logout}>
            Logout
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          {isAuthenticated ? (
            <Fragment>
              <i className='fas fa-user'>
                {' '}
                <span className='logo-img'>{name}</span>
              </i>
            </Fragment>
          ) : (
            <span className='logo-img'>Ticket-App</span>
          )}
        </Link>
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated && role === 'admin'
            ? adminLinks
            : isAuthenticated && role === 'user' && userLinks}
          {!isAuthenticated && guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
