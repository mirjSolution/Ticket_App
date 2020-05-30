import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './search-box.styles.css';

const SearchBox = ({ placeholder, handleChange, auth, linkAdd }) => (
  <div className='search'>
    <input
      className='search-input'
      type='search'
      placeholder={placeholder}
      onChange={handleChange}
    />
    {linkAdd && auth.role === 'admin' ? (
      <Link className='add-item' to='/addevent'>
        ADD CONCERT EVENT
      </Link>
    ) : null}
  </div>
);

SearchBox.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SearchBox);
