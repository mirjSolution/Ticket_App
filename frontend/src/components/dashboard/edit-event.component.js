import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventById, createEvent } from '../../actions/events';
import { setAlert } from '../../actions/alert';

const EditEvent = ({
  events: { events, loading },
  getEventById,
  createEvent,
  match,
  history,
}) => {
  const [formData, setFormData] = useState({
    eventDate: '',
    eventTime: '',
    area: '',
    name: '',
    description: '',
    general: '',
    genQty: '',
    vip: '',
    vipQty: '',
    reserved: '',
    resQty: '',
    earlybird: '',
    earlyQty: '',
    urlPic: '',
  });

  useEffect(() => {
    getEventById(match.params.id);

    setFormData({
      eventDate: loading || !events.eventDate ? '' : events.eventDate,
      eventTime: loading || !events.eventTime ? '' : events.eventTime,
      area: loading || !events.area ? '' : events.area,
      name: loading || !events.name ? '' : events.name,
      description: loading || !events.description ? '' : events.description,
      general: loading || !events.general ? '' : events.general,
      genQty: loading || !events.genQty ? '' : events.genQty,
      vip: loading || !events.vip ? '' : events.vip,
      vipQty: loading || !events.vipQty ? '' : events.vipQty,
      reserved: loading || !events.reserved ? '' : events.reserved,
      resQty: loading || !events.resQty ? '' : events.resQty,
      earlybird: loading || !events.earlybird ? '' : events.earlybird,
      earlyQty: loading || !events.earlyQty ? '' : events.earlyQty,
      urlPic: loading || !events.urlPic ? '' : events.urlPic,
    });
  }, [
    loading,
    getEventById,
    match.params.id,
    events.eventDate,
    events.eventTime,
    events.area,
    events.name,
    events.description,
    events.general,
    events.genQty,
    events.vip,
    events.vipQty,
    events.reserved,
    events.resQty,
    events.earlybird,
    events.earlyQty,
    events.urlPic,
  ]);

  const {
    eventDate,
    eventTime,
    area,
    name,
    description,
    general,
    genQty,
    vip,
    vipQty,
    reserved,
    resQty,
    earlybird,
    earlyQty,
    urlPic,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    createEvent(formData, history, true, match.params.id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Edit Event</h1>
          <p className='lead'>
            <i className='far fa-edit'></i>Edit concert events, location and
            ticket price
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <h4>Date</h4>
              <input
                type='date'
                placeholder='Date'
                name='eventDate'
                value={eventDate}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>Time</h4>
              <input
                type='time'
                placeholder='Time'
                name='eventTime'
                value={eventTime}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>Area/Location</h4>
              <input
                type='text'
                placeholder='Area/Location'
                name='area'
                value={area}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>Concert Name</h4>
              <input
                type='text'
                placeholder='Concert Name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>Description</h4>
              <input
                type='text'
                placeholder='Description'
                name='description'
                value={description}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>Image</h4>
              <input
                type='text'
                placeholder='URL Picture'
                name='urlPic'
                value={urlPic}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>General Admission</h4>
              <input
                type='number'
                placeholder='Price'
                name='general'
                value={general}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>General Quantity</h4>
              <input
                type='number'
                placeholder='Ticket Quantity'
                name='genQty'
                value={genQty}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>VIP</h4>
              <input
                type='number'
                placeholder='Price'
                name='vip'
                value={vip}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>VIP Quantity</h4>
              <input
                type='number'
                placeholder='Ticket Quantity'
                name='vipQty'
                value={vipQty}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>Reserved Quantity</h4>
              <input
                type='number'
                placeholder='Price'
                name='reserved'
                value={reserved}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>Reserved Quantity</h4>
              <input
                type='number'
                placeholder='Ticket Quantity'
                name='resQty'
                value={resQty}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>Early Bird</h4>
              <input
                type='number'
                placeholder='Price'
                name='earlybird'
                value={earlybird}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <h4>Early Bird Quantity</h4>
              <input
                type='number'
                placeholder='Ticket Quantity'
                name='earlyQty'
                value={earlyQty}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary my-1' />
            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

EditEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
  getItemById: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, {
  getEventById,
  createEvent,
  setAlert,
})(withRouter(EditEvent));
