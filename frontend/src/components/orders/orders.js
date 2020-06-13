import React, { Fragment, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrderById, deleteOrder } from '../../actions/orders';

import './orders.css';
import checkout from '../checkout/checkout';

const Orders = ({
  orders: { orders, loading },
  getOrderById,
  deleteOrder,
  match,
}) => {
  useEffect(() => {
    getOrderById(match.params.id);
  }, [getOrderById, match.params.id]);

  const fetchRequest = useCallback(() => {
    getOrderById(match.params.id);
  }, [getOrderById, match.params.id]);

  const DeleteOrder = (orderId) => {
    fetchRequest();
    fetchRequest();
    deleteOrder(orderId);
    fetchRequest();
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <div className='order-details' key={order._id}>
            <img
              // src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${`Purchased Date: ${order.purchasedAt} Event Name: ${order.order_name} Ticket Description: ${order.order_general} ${order.order_vip} ${order.order_total} `}`}
              // src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${`https://google.com/${order._id}`}`}
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${`${order.ticketId}`}`}
              alt='qrCode'
              className='order__img'
            />
            <div className='order'>
              <div className='order__content'>
                <div className='order__title'>
                  <h1 className='order__heading'>{order.order_name}</h1>
                </div>
                <p className='order__description'>
                  Date Purchased: {order.purchasedAt}
                </p>
                <p className='order__description'>{order.order_general}</p>
                <p className='order__description'>{order.order_vip}</p>
                <p className='order__description' style={{ fontSize: '20px' }}>
                  {order.order_total}
                </p>
              </div>
              <div
                className='order__delete'
                onClick={() => DeleteOrder(order._id)}
              >
                DELETE
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='no-purchase'>
          <h1>No Purchased Tickets</h1>
        </div>
      )}
    </Fragment>
  );
};
checkout.propTypes = {
  orders: PropTypes.object,
  deleteOrder: PropTypes.func,
  getOrderById: PropTypes.func,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, { getOrderById, deleteOrder })(
  withRouter(Orders)
);
