import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createOrder } from '../../actions/orders';
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
}) => {
  const [formData] = useState({
    order_name: events.name,
    order_general: quantityGA
      ? `General Admission: ${quantityGA} X ${events.general} =` +
        '  $' +
        quantityGA * events.general
      : '',
    order_vip: quantityVIP
      ? `VIP: ${quantityVIP} X ${events.vip} =` +
        '  $' +
        quantityVIP * events.vip
      : '',
    order_total: `Total : ${total.toFixed(2)}`,
    order_general_qty: quantityGA,
    order_vip_qty: quantityVIP,
    order_total_tot: total,
    event: events._id,
    user: auth.userId,
    ga_tickets_left: events.genQty,
    vip_tickets_left: events.vipQty,
  });

  const {
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
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    createOrder(formData, history, user);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='checkout-box'>
            <div className='inner'>
              <h1
                className='heading'
                style={{
                  textTransform: 'lowercase',
                }}
              >
                <span>{auth.email}</span>
              </h1>
              <form className='form checkout' onSubmit={(e) => onSubmit(e)}>
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
                  name='event'
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
  email: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  createOrder: PropTypes.func.isRequired,
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
})(withRouter(Checkout));