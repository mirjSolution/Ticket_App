import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Events from './components/Event/Event';
import EventDetails from './components/Event/EventDetail';
import checkout from './components/checkout/checkout';
import Orders from './components/orders/orders';
import Purchases from './components/purchases/purchases';
import Reader from './components/reader/reader';
import AddEvent from './components/dashboard/add-event.component';
import EditEvent from './components/dashboard/edit-event.component';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/forgot' component={Forgot} />
              <Route exact path='/reset/:resettoken' component={Reset} />
              <Route exact path='/events' component={Events} />
              <Route exact path='/checkout/:id' component={checkout} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/addevent' component={AddEvent} />
              <PrivateRoute exact path='/editevent/:id' component={EditEvent} />
              <PrivateRoute exact path='/orders/:userId' component={Orders} />
              <PrivateRoute exact path='/purchases' component={Purchases} />
              <Route exact path='/reader/:ticketId' component={Reader} />
              <Route exact path='/eventdetails/:id' component={EventDetails} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
