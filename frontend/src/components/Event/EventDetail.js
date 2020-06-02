import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventById } from '../../actions/events';
import { setAlert } from '../../actions/alert';

const EventDetail = ({
  events: { events, loading },
  getEventById,
  match,
  history,
}) => {
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

  useEffect(() => {
    getEventById(match.params.id);

    setFormData({
      eventDate: loading || !events.eventDate ? '' : events.eventDate,
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
          <h1 className='large text-primary'>Concert Details</h1>
          <img className='event-image' src={urlPic} alt='' />
          <p>{eventDate}</p>
          <p>{area}</p>
          <p>{name}</p>
          <p>{description}</p>
          <p>{general}</p>
          <p>{genQty}</p>
          <p>{vip}</p>
          <p>{vipQty}</p>
          <p>{reserved}</p>
          <p>{resQty}</p>
          <p>{earlybird}</p>
          <p>{earlyQty}</p>
        </Fragment>
      )}
    </Fragment>
  );
};

EventDetail.propTypes = {
  getItemById: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, {
  getEventById,
  setAlert,
})(withRouter(EventDetail));
