import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent } from '../../actions/events';

const AddEvent = ({ createEvent, history }) => {
  const [formData, setFormData] = useState({
    eventDate: '',
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

  const {
    eventDate,
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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createEvent(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Event</h1>
      <p className='lead'>
        <i className='fas fa-plus'></i> Add any concert events, location and
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
  );
};

AddEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
};

export default connect(null, { createEvent })(withRouter(AddEvent));
