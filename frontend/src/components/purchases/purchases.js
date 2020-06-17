import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPurchases, deletePurchase } from '../../actions/purchases';

import SearchBox from '../../components/utils/search-box/search-box.component';
import './purchases.css';

const Purchases = ({
  purchases: { purchases, loading },
  getPurchases,
  deletePurchase,
  history,
}) => {
  const [formSearch, setFormSearch] = useState({
    searchField: '',
  });
  useEffect(() => {
    getPurchases();
  }, [getPurchases]);

  const handleChange = (event) => {
    setFormSearch({ searchField: event.target.value });
  };

  const { searchField } = formSearch;

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='purchases-preview'>
        <SearchBox
          placeholder='Search Events'
          handleChange={handleChange}
          linkAdd={false}
        />

        <table className='items'>
          <thead>
            <tr>
              <th>Ticket Id</th>
              <th>Purchase Date</th>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Customer Email</th>
              <th>Customer Name</th>
              <th>G.A Desc</th>
              <th>VIP Desc</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length > 0
              ? purchases
                  .filter(
                    (purchase) =>
                      purchase.userEmail
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      purchase.order_name
                        .toString()
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      purchase.userName
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      purchase.eventDate
                        .toLowerCase()
                        .includes(searchField.toLowerCase()) ||
                      purchase.purchasedAt
                        .toLowerCase()
                        .includes(searchField.toLowerCase())
                  )
                  .map((purchase) => (
                    <tr key={purchase._id}>
                      <td className={purchase.ticketId ? '' : 's-padding'}>
                        {purchase.ticketId}
                      </td>
                      <td
                        className={
                          purchase.purchasedAt ? 'package' : 's-padding'
                        }
                      >
                        {purchase.purchasedAt}
                      </td>
                      <td
                        className={
                          purchase.order_name ? 'package' : 's-padding'
                        }
                      >
                        {purchase.order_name}
                      </td>
                      <td className={purchase.eventDate ? '' : 's-padding'}>
                        {purchase.eventDate}
                      </td>
                      <td className={purchase.userEmail ? '' : 's-padding'}>
                        {purchase.userEmail}
                      </td>
                      <td className={purchase.userName ? '' : 's-padding'}>
                        {purchase.userName}
                      </td>
                      <td className={purchase.order_general ? '' : 's-padding'}>
                        {purchase.order_general}
                      </td>
                      <td className={purchase.order_vip ? '' : 's-padding'}>
                        {purchase.order_vip}
                      </td>

                      <td>
                        <div className='actions'>
                          <Link
                            to='/dashboard'
                            onClick={() =>
                              deletePurchase(purchase._id, history)
                            }
                          >
                            <i className='fas fa-trash-alt'></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
Purchases.propTypes = {
  purchases: PropTypes.object,
  deletePurchase: PropTypes.func,
  getPurchases: PropTypes.func,
};

const mapStateToProps = (state) => ({
  purchases: state.purchases,
});

export default connect(mapStateToProps, { getPurchases, deletePurchase })(
  Purchases
);
