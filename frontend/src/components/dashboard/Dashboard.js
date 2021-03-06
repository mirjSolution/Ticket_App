import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getEvents, deleteEvent } from '../../actions/events';

import './dashboard.css';

import SearchBox from '../../components/utils/search-box/search-box.component';
const Dashboard = ({ getEvents, deleteEvent, events: { events, loading } }) => {
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
      <div className='collection-preview'>
        <SearchBox
          placeholder='Search Events'
          handleChange={handleChange}
          linkAdd={true}
        />

        <table className='items'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Area/Location</th>
              <th>Description</th>
              <th>G.A. Price</th>
              <th>G.A. Qty</th>
              <th>VIP Price</th>
              <th>VIP Qty</th>
              <th>Res Price</th>
              <th>Res Qty</th>
              <th>E.B Price</th>
              <th>E.B Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0
              ? events
                  .filter(
                    (event) =>
                      event.name
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      event.area
                        .toString()
                        .toLowerCase()
                        .includes(searchField.toLowerCase())
                  )
                  .map((event) => (
                    <tr key={event._id}>
                      <td className={event.name ? '' : 's-padding'}>
                        {event.name}
                      </td>
                      <td className={event.eventDate ? 'package' : 's-padding'}>
                        {event.eventDate}
                      </td>
                      <td className={event.eventTime ? 'package' : 's-padding'}>
                        {event.eventTime}
                      </td>
                      <td className={event.area ? '' : 's-padding'}>
                        {event.area}
                      </td>
                      <td className={event.description ? '' : 's-padding'}>
                        {event.description}
                      </td>
                      <td className={event.general ? '' : 's-padding'}>
                        {event.general}
                      </td>
                      <td className={event.genQty ? '' : 's-padding'}>
                        {event.genQty}
                      </td>
                      <td className={event.vip ? '' : 's-padding'}>
                        {event.vip}
                      </td>
                      <td className={event.vipQty ? '' : 's-padding'}>
                        {event.vipQty}
                      </td>
                      <td className={event.reserved ? '' : 's-padding'}>
                        {event.reserved}
                      </td>
                      <td className={event.resQty ? '' : 's-padding'}>
                        {event.resQty}
                      </td>
                      <td className={event.earlybird ? '' : 's-padding'}>
                        {event.earlybird}
                      </td>
                      <td className={event.earlyQty ? '' : 's-padding'}>
                        {event.earlyQty}
                      </td>
                      <td>
                        <div className='actions'>
                          <Link to={`/editevent/${event._id}`}>
                            <i className='fas fa-edit'></i>
                          </Link>
                          <Link
                            to='/dashboard'
                            onClick={() => deleteEvent(event._id)}
                          >
                            <i className='fas fa-trash-alt'></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, { getEvents, deleteEvent })(Dashboard);
