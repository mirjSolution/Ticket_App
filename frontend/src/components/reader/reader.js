import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import { getTicketId, updateTicket } from '../../actions/purchases';

import PropTypes from 'prop-types';

import './reader.css';

const Reader = ({
  auth: { role },
  purchases: { purchases },
  getTicketId,
  updateTicket,
  validity,
  match,
}) => {
  useEffect(() => {
    getTicketId(match.params.ticketId);
  }, [getTicketId, match.params.ticketId]);

  const onSubmit = async (e) => {
    if (validity === 'valid') {
      validity = 'not valid';
    } else if (validity === 'not valid') {
      validity = 'valid';
    }

    console.log(match.params.ticketId);
    console.log(validity);
    updateTicket(match.params.ticketId, validity);
    e.preventDefault();
  };

  return (
    purchases &&
    purchases.map((purchase) => (
      <Fragment key={purchase._id}>
        <div className='reader-box'>
          <div className='inner'>
            <form className='form reader' onSubmit={(e) => onSubmit(e)}>
              <h1
                className='text-center total-reader'
                style={{ fontFamily: 'monoton' }}
              >
                <span
                  style={{
                    fontSize: '25px',
                    color: 'blue',
                  }}
                >
                  {purchase.validity === 'valid' ? (
                    'Ticket is valid'
                  ) : (
                    <span
                      style={{
                        fontSize: '25px',
                        color: 'red',
                      }}
                    >
                      {'Ticket already used'}
                    </span>
                  )}
                </span>
              </h1>

              <h1
                className='text-center total-reader'
                style={{ fontFamily: 'monoton' }}
              >
                <span>{purchase.order_name}</span>
              </h1>

              <h2 className='text-center'>{purchase.event_date}</h2>
              <h2 className='text-center'>{purchase.event_time}</h2>
              <h2 className='text-center'>{purchase.order_general}</h2>
              <h2 className='text-center'>{purchase.order_vip}</h2>

              <h1 className='text-center total-reader'>
                <span name='order_total'>{purchase.order_total}</span>
              </h1>
              {role === 'admin' ? (
                <input
                  type='submit'
                  className='valid'
                  value='Change Ticket Status'
                />
              ) : (
                ''
              )}
            </form>
          </div>
        </div>
      </Fragment>
    ))
  );
};

Reader.propTypes = {
  auth: PropTypes.object.isRequired,
  purchases: PropTypes.object.isRequired,
  getTicketId: PropTypes.func.isRequired,
  updateTicket: PropTypes.func.isRequired,
  validity: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  purchases: state.purchases,
  validity: state.purchases.validity,
});
export default connect(mapStateToProps, { getTicketId, updateTicket })(Reader);
