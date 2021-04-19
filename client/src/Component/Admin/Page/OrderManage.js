import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const getOrder =  () => {
     axios.get("http://localhost:7000/getOrder",
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
        console.log(error,'hghg');
      })
  }
  useEffect(()=>{
    getOrder()
  },[])
  console.log(orders);
  
  return (
    <Layout>
      <div>
        <ul>
          {
            orders.map((item, index)=>{
              return(
                <li key={index} style={{display:'grid',gridTemplateColumns:'3fr 1fr 1fr'}}>
                  <div style={{display:'flex',justifyContent:'space-around'}}>
                    {item.products.map((item,index)=>{
                      return(
                        <span key={index}>{item.title}</span>
                      )
                    })}
                    <span>{item.orderid}</span>
                    <span>{item.orderstatus}</span>
                    <span>{item.paymentmethod}</span>
                  </div>
                  <div>
                    <span style={{textAlign:'center'}}>{item.title}</span>
                    <span style={{textAlign:'center'}}>{item.total}</span>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <button onClick=''style={{width:'50px',height:'50px'}}>+</button>
                    <button onClick=''style={{width:'50px',height:'50px'}}>-</button>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </Layout>
  );
};

export default OrderManage;