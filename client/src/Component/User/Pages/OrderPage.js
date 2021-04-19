import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useHistory } from "react-router-dom";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetailsProduct, setOrderDetailsProduct] = useState([]);
  const [details, setDetails] = useState(false);
  const getOrder = async () => {
    await axios.get("http://localhost:7000/getOrder",
      {
        headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
        }
      }
    )
      .then(result => {
        console.log(result, 'iryweiruyewiury');

        setOrders(result.data.myOrder)
      })
      .catch(error => {
        console.log(error);
      })
  }
  const detailsShow = (id) => {
    orders.filter(item => {
      if (item._id === id) {
        setOrderDetailsProduct(item.products)
      }
    })
    setDetails(true)
  }
  const history = useHistory();
  const printPage =()=>{
    history.push('/invoicePage')
  }
  useEffect(() => {
    getOrder()
  }, [])
  console.log(orders);
  console.log(orderDetailsProduct);
  return (
    <>
      {
        details
          ?
          <>
            <div>
              <p>My Orders / Tracking</p>
              <hr />
              <div>Order Id: </div>
              <div style={{ 'display': 'flex', 'justifyContent': 'space-around', 'alignItem': 'center' }}>
                <div style={{ 'padding': '10px' }}>
                  <h2>Estimated Delivery Time</h2>
                  <p>date </p>
                  <p>time</p>
                </div>
                <div style={{ 'textAlign': 'center' }}>
                  <h2>Shipping By: </h2>
                  <p>shipping by | mobile number</p>
                </div>
                <div style={{ 'textAlign': 'center' }}>
                  <p>Status: </p>
                  <button>pending</button>
                </div>
              </div>
            </div>
            <div>
              <p>set order status by admin</p>
            </div>
            <div style={{ 'display': 'flex', 'justifyContent': 'space-around', 'alignItem': 'center' }}>
              {
                orderDetailsProduct.map((items, index) => {
                  return (
                    <div style={{ border: '1px solid #3333', padding: '10px' }}>
                      <p>{items.title}</p>
                      <p>{items.price}</p>
                    </div>
                  )
                })
              }
            </div>
          </>
          :
          <>
            <div style={{ 'display': 'grid', 'gridTemplateRows': '1fr 1fr' }}>
              <div className="item1" style={{ 'display': 'grid', 'gridTemplateColumns': '1fr 2fr 1fr 2fr 1fr 1fr' }}>
                <p>S No</p>
                <p>order id</p>
                <p>status</p>
                <p>statusDate / Time</p>
                <p>invoice</p>
                <p>order details</p>
              </div>
              {
                orders.map((item, index) => {
                  return (
                    <div className="item2" style={{ 'display': 'grid', 'gridTemplateColumns': '1fr 2fr 1fr 2fr 1fr 1fr' }}>
                      <p>{index + 1}</p>
                      <p>{item.orderid}</p>
                      <p>{item.orderstatus}</p>
                      <p><Moment >{item.createdAt}</Moment></p>
                      <button onClick={printPage}>print/save</button>
                      <button onClick={() => detailsShow(item._id)}>click</button>
                    </div>
                  )
                })
              }
            </div>
          </>
      }
    </>
  );
};

export default OrderPage;