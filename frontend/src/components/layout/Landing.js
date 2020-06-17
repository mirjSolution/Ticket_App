import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Concerts, Tickets and Tour Dates 2020</h1>
          <p className='lead' style={{ fontFamily: 'var(--new-rocker)' }}>
            Check out the best live upcoming concerts, and buy tickets online
          </p>
          <div className='buttons'>
            <Link to='/events' className='btn btn-primary'>
              events
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
