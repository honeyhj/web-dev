import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [editabale, setEditabale] = useState('');

  const editabaleData = (e) => {
    const newEditiable = { ...editabale }
    newEditiable[e.target.name] = e.target.value;
    setEditabale(newEditiable)
  }
  const openDetails = (item) => {
    setEditabale(item)
    setOpen(true)
  }
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
        setOrders(result)
      })
      .catch(error => {
        console.log(error, 'hghg');
      })
  }
  const updateOrder = async () => {
    await axios.post(`${URL}/updateOrder/`,
      editabale,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "auth": localStorage.getItem('auth')
        }
      })
      .then(data => {
        alert('updated')
      })
      .catch(error => {
        console.log(error);
      })
  }
  useEffect(() => {
    getOrder()
  }, [])
  console.log(orders);
  return (
    <Layout>
      {open
        ?
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: "center", alignItem: 'center' }}>
          <div style={{ width: '300px', height: 'auto', border: '1px solid #3333' }}>
            <input type="text" placeholder='orderstatus' name='orderstatus' value={editabale.orderstatus} onChange={editabaleData} /><br /><br />
            <button onClick={updateOrder}>update</button><br /><br />
            <button onClick={() => setOpen(false)}>X</button>
          </div>
        </div>
        :
        <div>
          <ul>
            {
              orders.map((item, index) => {
                return (
                  <li key={index} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      {item.products.map((item, index) => {
                        return (
                          <span key={index}>{item.title}</span>
                        )
                      })}
                      <span>{item.orderid}</span>
                      <span>{item.orderstatus}</span>
                      <span>{item.paymentmethod}</span>
                    </div>
                    <div>
                      <span style={{ textAlign: 'center' }}>{item.title}</span>
                      <span style={{ textAlign: 'center' }}>{item.total}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button onClick={() => openDetails(item.orderstatus)} style={{ width: '50px', height: '50px' }}>+</button>
                      <button onClick='' style={{ width: '50px', height: '50px' }}>-</button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      }
    </Layout>
  );
};

export default OrderManage;