import React from 'react';
import PaypalExpressBtn from "react-paypal-express-checkout";

const Paypal = () => {
  const client = {
    sandbox:    'YOUR-SANDBOX-APP-ID',
    production: 'YOUR-PRODUCTION-APP-ID',
}
  return (
    <PaypalExpressBtn client={client} currency={"EUR"} total={1.0} />
  );
};

export default Paypal;