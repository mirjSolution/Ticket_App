import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventById } from '../../actions/events';
import { setAlert } from '../../actions/alert';
import './EventDetail.css';

const EventDetail = ({
  events: { events, loading },
  getEventById,
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

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='box'>
            <div>
              <img className='image' src={urlPic} alt='' />
            </div>
            <div className='inner'>
              <h1 className='heading'>
                <span>{name}</span>
                <span>{eventDate}</span>
                <span>{eventTime}</span>
              </h1>
              <h2 className='description'>{description}</h2>
              <table className='tbl-event-details'>
                <thead>
                  <tr>
                    <th>Ticket Left</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th></th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='tbl-details'>
                    <td>{genQty}</td>
                    <td>G.A.</td>
                    <td>${general}</td>
                    <td></td>
                    <td>
                      <i className='fas fa-plus-square'></i>
                      <span className='quantity'>0</span>
                      <i className='fas fa-minus-square'></i>
                    </td>
                    <td></td>
                  </tr>

                  <tr className='tbl-details'>
                    <td>{vipQty}</td>
                    <td>VIP</td>
                    <td>${vip}</td>
                    <td></td>
                    <td>
                      <i className='fas fa-plus-square'></i>
                      <span className='quantity'>0</span>
                      <i className='fas fa-minus-square'></i>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>

              <div className='total'>
                <h2>
                  <p>Total : $ 0.00</p>
                </h2>
              </div>
              <br />
              <br />

              <Link className='buy' to='/checkout'>
                PROCEED TO PAY
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EventDetail.propTypes = {
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, {
  getEventById,
  setAlert,
})(withRouter(EventDetail));
