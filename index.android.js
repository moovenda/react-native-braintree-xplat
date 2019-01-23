'use strict';

import { NativeModules } from 'react-native';
import { mapParameters } from './utils';

const Braintree = NativeModules.Braintree;

module.exports = {
  setup(token) {
    return new Promise(function(resolve, reject) {
      Braintree.setup(token, test => resolve(test), err => reject(err));
    });
  },

  getCardNonce(parameters = {}) {
    return new Promise(function(resolve, reject) {
      Braintree.getCardNonce(
        mapParameters(parameters),
        nonce => resolve(nonce),
        err => reject(err)
      );
    });
  },

  showPaymentViewController (config = {}) {
    var options = {
      callToActionText: config.callToActionText,
      title: config.title,
      description: config.description,
      amount: config.amount,
      sandbox: config.sandbox
    }
    return new Promise(function (resolve, reject) {
      Braintree.paymentRequest(
        options,
        (nonce, deviceData) => resolve({ nonce, deviceData }),
        error => reject(error)
      )
    })
  },

  showPayPalViewController() {
    return new Promise(function(resolve, reject) {
      Braintree.paypalRequest(nonce => resolve(nonce), error => reject(error));
    });
  },

  getDeviceData (config = {}) {
    var options = {
      sandbox: config.sandbox
    }
    return new Promise(function (resolve, reject) {
      Braintree.getDeviceData(
        options,
        (deviceData) => resolve({ deviceData }),
        error => reject(error)
      )
    })
  },
};
