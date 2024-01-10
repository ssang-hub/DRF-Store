import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

export default function Payment({ order_id, clientSecret }) {
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Payment">
      <div className="modal fade" id="PaymentOrder" tabIndex={-1} role="dialog" aria-labelledby="PaymentOrderTitle">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="PaymentOrderLongTitle">
                Thanh toan
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {clientSecret && (
              <div className="modal-body">
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm order_id={order_id} />
                </Elements>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
