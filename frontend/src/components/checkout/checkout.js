import React, { Fragment } from 'react';

import './checkout.css';
const checkout = (props) => {
  return (
    <Fragment>
      <div id='container'>
        <form id='form'>
          <h1>Payment Details</h1>

          <formfield id='creditcholder'>
            <label for='cc_h'>Card Holder</label>
            <input id='cc_h' type='text' placeholder='First Name' />
            <input type='text' placeholder='Last Name' />
          </formfield>

          <formfield id='creditcnumber'>
            <label for='cc_n'>Credit Card Number</label>
            <input
              id='cc_n'
              type='text'
              maxlength='16'
              placeholder='0000 0000 0000 0000'
              name='cno'
            />
          </formfield>

          <div id='cardinfo'>
            <formfield id='expirationdate'>
              <label>Expiration Date</label>
              <div class='select'>
                <span class='arr'></span>
                <select id='month'>
                  <option value='01'>01</option>
                  <option value='02'>02</option>
                  <option value='03'>03</option>
                  <option value='04'>04</option>
                  <option value='05'>05</option>
                  <option value='06'>06</option>
                  <option value='07'>07</option>
                  <option value='08'>08</option>
                  <option value='09'>09</option>
                  <option value='10'>10</option>
                  <option value='11'>11</option>
                  <option value='12'>12</option>
                </select>
              </div>

              <div class='select two'>
                <span class='arr'></span>
                <select id='year'>
                  <option value='16'>16</option>
                  <option value='17'>17</option>
                  <option value='18'>18</option>
                  <option value='19'>19</option>
                  <option value='20'>20</option>
                  <option value='21'>21</option>
                  <option value='22'>22</option>
                </select>
              </div>
            </formfield>

            <formfield id='securitycode'>
              <label for='secc'>Security Code</label>
              <input id='secc' type='text' maxlength='3' placeholder='000' />
            </formfield>
          </div>

          <div id='confirm'>
            <formfield id='submit'>
              <input type='reset' value='Reset' />
              <input type='submit' value='Pay Now' />
            </formfield>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default checkout;
