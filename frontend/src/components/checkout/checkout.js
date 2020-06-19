import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createOrder } from '../../actions/orders';
import { sendMessage } from '../../actions/message';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { getEventById, eventTotal } from '../../actions/events';
import { setAlert } from '../../actions/alert';
import './checkout.css';

const Checkout = ({
  events: { events, loading },
  auth,
  quantityVIP,
  quantityGA,
  createOrder,
  total,
  history,
  sendMessage,
}) => {
  const ticket = uuid();
  const today = moment();

  const [formData, setFormData] = useState({
    eventDate: events.eventDate,
    eventTime: events.eventTime,
    description: events.description,
    area: events.area,
    urlPic: events.urlPic,
    userName: auth.name,
    userEmail: auth.role === 'admin' || auth.role === 'user' ? auth.email : '',
    order_name: events.name,
    order_general: quantityGA
      ? `General Admission: ${quantityGA} X ${events.general} =` +
        '  $' +
        quantityGA.toFixed(2) * events.general.toFixed(2)
      : '',
    order_vip: quantityVIP
      ? `VIP: ${quantityVIP} X ${events.vip} =` +
        '  $' +
        quantityVIP * events.vip
      : '',
    order_total: `Total : $${total.toFixed(2)}`,
    order_general_qty: quantityGA,
    order_vip_qty: quantityVIP,
    order_total_tot: total,
    event: events._id,
    user: auth.userId,
    ga_tickets_left: events.genQty,
    vip_tickets_left: events.vipQty,
    purchasedAt: today.format('YYYY-MM-DD'),
    ticketId: ticket,
    validity: 'valid',
    role: auth.role,
  });

  const {
    eventDate,
    eventTime,
    description,
    area,
    urlPic,
    userName,
    userEmail,
    order_name,
    order_general,
    order_vip,
    order_total,
    event,
    user,
    order_general_qty,
    order_vip_qty,
    order_total_tot,
    ga_tickets_left,
    vip_tickets_left,
    purchasedAt,
    ticketId,
    validity,
    role,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, userEmail: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createOrder(formData, history, user, role);
    sendMessage({
      eventDate,
      eventTime,
      description,
      area,
      urlPic,
      ticketId,
      order_name,
      purchasedAt,
      order_general,
      order_vip,
      order_total,
      userEmail,
      userName,
    });
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='checkout-box'>
            <div className='inner'>
              <form className='form checkout' onSubmit={(e) => onSubmit(e)}>
                <input
                  type='email'
                  className='heading input-usermail'
                  style={
                    role === 'admin' || role === 'user'
                      ? {
                          textTransform: 'lowercase',
                        }
                      : {
                          border: 'solid',

                          fontFamily: 'var(--roboto)',
                          textAlign: 'center',
                        }
                  }
                  placeholder='Email Address'
                  name='userEmail'
                  value={userEmail}
                  onChange={(e) => onChange(e)}
                  disabled={role === 'admin' || (role === 'user' && true)}
                  required
                />
                <h1 className='heading'>CARD DETAILS</h1>
                <div className='form-group'>
                  <input type='text' placeholder='Card Name' name='cardname' />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Card Number'
                    name='cardnumber'
                  />
                </div>
                <h1 className='heading'>EXPIRATION/CVC</h1>
                <div className='card-exp-cvc'>
                  <div className='expiration'>
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Month'
                        name='expmonth'
                        style={{ fontSize: '13px' }}
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Year'
                        style={{ fontSize: '13px' }}
                        name='expyear'
                      />
                    </div>
                  </div>
                  <div className='cvc'>
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='CVC'
                        style={{ fontSize: '13px' }}
                        name='cvc'
                      />
                    </div>
                  </div>
                </div>
                <h1
                  className='text-center total-checkout'
                  style={{ fontFamily: 'monoton' }}
                >
                  <span>{events.name}</span>
                </h1>

                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='userName'
                  value={userName}
                >
                  {userName}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='eventDate'
                  value={eventDate}
                >
                  {eventDate}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='eventTime'
                  value={eventTime}
                >
                  {eventTime}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='validity'
                  value={validity}
                >
                  {validity}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='description'
                  value={description}
                >
                  {description}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='area'
                  value={area}
                >
                  {area}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='urlPic'
                  value={urlPic}
                >
                  {urlPic}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='ticketId'
                  value={ticketId}
                >
                  {ticketId}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='purchasedAt'
                  value={purchasedAt}
                >
                  {purchasedAt}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='order_name'
                  value={order_name}
                >
                  {order_name}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='event'
                  value={event}
                >
                  {event}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='user'
                  value={user}
                >
                  {user}
                </h2>

                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='order_general_qty'
                  value={order_general_qty}
                >
                  {order_general_qty}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='order_vip_qty'
                  value={order_vip_qty}
                >
                  {order_vip_qty}
                </h2>

                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='order_total_tot'
                  value={order_total_tot}
                >
                  {order_total_tot}
                </h2>

                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='ga_tickets_left'
                  value={ga_tickets_left}
                >
                  {ga_tickets_left}
                </h2>
                <h2
                  style={{ display: 'none' }}
                  className='text-center'
                  name='vip_tickets_left'
                  value={vip_tickets_left}
                >
                  {vip_tickets_left}
                </h2>
                <h2
                  className='text-center'
                  name='order_general'
                  value={order_general}
                >
                  {order_general}
                </h2>

                <h2 className='text-center' name='order_vip' value={order_vip}>
                  {order_vip}
                </h2>
                <h1 className='text-center total-checkout'>
                  <span name='order_total' value={order_total}>
                    {order_total}
                  </span>
                </h1>
                <input type='submit' className='buy' value='Buy Now' />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Checkout.propTypes = {
  events: PropTypes.object.isRequired,
  quantityVIP: PropTypes.number.isRequired,
  quantityGA: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  email: PropTypes.string,
  auth: PropTypes.object.isRequired,
  createOrder: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
  quantityVIP: state.events.quantityVIP,
  quantityGA: state.events.quantityGA,
  total: state.events.total,
  email: state.auth.email,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getEventById,
  setAlert,
  eventTotal,
  createOrder,
  sendMessage,
})(withRouter(Checkout));
