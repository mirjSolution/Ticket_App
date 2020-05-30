import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getEvents } from '../../actions/events';

import './event.css';
import SearchBox from '../../components/utils/search-box/search-box.component';
const Event = ({ getEvents, events: { events, loading } }) => {
  const [formSearch, setFormSearch] = useState({
    searchField: '',
  });

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const handleChange = (event) => {
    setFormSearch({ searchField: event.target.value });
  };

  const { searchField } = formSearch;

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='events-preview'>
        <SearchBox
          placeholder='Search Events'
          handleChange={handleChange}
          linkAdd={false}
        />
      </div>
      {events.length > 0
        ? events
            .filter(
              (event) =>
                event.name.toLowerCase().includes(searchField.toLowerCase()) ||
                event.area
                  .toString()
                  .toLowerCase()
                  .includes(searchField.toLowerCase())
            )
            .map((event) => (
              <Fragment key={event._id}>
                <div className='tc bg-white dib br3 pa1 ma2 grow bw2 shadow-5'>
                  <h2>{event.name}</h2>
                  <img className='event-image' src={event.urlPic} alt='' />
                  <h3>{event.eventDate}</h3>
                </div>
              </Fragment>
            ))
        : null}
    </Fragment>
  );
};

Event.propTypes = {
  getEvents: PropTypes.func.isRequired,

  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, { getEvents })(Event);
