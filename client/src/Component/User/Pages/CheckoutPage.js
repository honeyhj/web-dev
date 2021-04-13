import axios from 'axios';
import React, { useState } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
const CheckoutPage = ({cart}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [thana, setThana] = useState('');
  const [postal, setPostal] = useState('');
  const [road, setRoad] = useState('');

  const [orderid , setOrderid]=useState('');
  const [paymentid , setPaymentid]=useState('');
  const [products , setProducts]=useState('');
  const [total , setTotal]=useState('');
  const [dateofpurcashe , setDateofpurcashe]=useState('');
  const [orderstatus , setOrderstatus]=useState('');
  const [paymentmethod , setPaymentmethod]=useState('');

  console.log(cart);
      
  const setOrder = async()=>{
    const orderInfo = {
      orderid,
      paymentid,
      products,
      total,
      dateofpurcashe,
      orderstatus,
      paymentmethod:'paypal',
    }
    await axios.post("http://localhost:7000/createOrder",orderInfo,{
      headers: {
        Accept: "application/json",
        "Cotent-Type": "application/json",
        "auth": localStorage.getItem('auth')
    },
    })
    .then(result=>{
      console.log(result);
      
    })
    .catch(error=>{
      console.log(error);
      
    })
  }
//   const onSuccess = async(payment) => {
//     const orderInfo = {
//       orderid,
//       paymentid:'#0',
//       products,
//       total:'1209',
//       dateofpurcashe,
//       orderstatus,
//       paymentmethod:'paypal',
//       name,mobile,address,thana,postal,road
//     }
//     function getNumber(callback) {
//       var n = Math.floor(Math.random() * 1000);
//       Users.findOne(
//         { orderid: n },
//         function (err, result) {
//           if (err) callback(err);
//           else if (result) return getNumber(callback);
//           else callback(null, n);
//         }
//       );
//     }

//     getNumber(function (error, number) {
//       const newUser = new Users({
//         ...orderInfo,
//         orderid: number,
//         myrefused: 0,
//       });
//       setOrder(newUser)
//     })
    
//     console.log("The payment was succeeded!", payment);
//     // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
//   }

//   const onCancel = (data) => {
//     // User pressed "cancel" or close Paypal's popup!
//     console.log('The payment was cancelled!', data);
//     // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
// }

//   const onError = (err) => {
//     // The main Paypal's script cannot be loaded or somethings block the loading of that script!
//     console.log("Error!", err);
//     // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
//     // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
//   }

//   let env = 'sandbox'; // you can set here to 'production' for production
//   let currency = 'USD'; // or you can set this value from your props or state
//   // let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
//   // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

//   const client = {
//     sandbox: 'AfRPtsoxbVeHQfNEWVnXnkPYYSFe1FWY_9JTIRCoY3Vj-NBeosHQ81-YSXMSgPMV6xhNnlx4SSg4NLAd',
//     production: 'YOUR-PRODUCTION-APP-ID',
//   }
  return (
    <div>
        <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} /><br /><br />
        <input type="text" value={mobile} placeholder="mobile" onChange={(e) => setMobile(e.target.value)} /><br /><br />
        <input type="text" value={address} placeholder="address" onChange={(e) => setAddress(e.target.value)} /><br /><br />
        <input type="text" value={thana} placeholder="thana" onChange={(e) => setThana(e.target.value)} /><br /><br />
        <input type="text" value={postal} placeholder="postal" onChange={(e) => setPostal(e.target.value)} /><br /><br />
        <input type="text" value={road} placeholder="road" onChange={(e) => setRoad(e.target.value)} /><br /><br />
        {/* <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} /> */}
        <button onClick={setOrder}>paypal</button>
    </div>
  );
};

export default CheckoutPage;