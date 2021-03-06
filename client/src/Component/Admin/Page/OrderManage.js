import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [editabale, setEditabale] = useState('');
  const [id , setId]=useState('');
  const [loading , setLoading]=useState(false);

  // const editabaleData = (e) => {
  //   const newEditiable = { ...editabale }
  //   newEditiable[e.target.name] = e.target.value;
  //   setEditabale(newEditiable)
  // }

  const openDetails = (item,id) => {
    setEditabale(item)
    setId(id)
    setOpen(true)
  }
  const getOrder = async () => {
    setLoading(true)
    await axios.get("http://localhost:7000/getOrder",
      {
        headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json"
        }
      }
    )
      .then(result => {
        setLoading(false)
        console.log(result, 'iryweiruyewiury');
        setOrders(result.data)
      })
      .catch(error => {
        setLoading(false)
        console.log(error, 'hghg');
      })
  }
  const updateOrder = async () => {
    setLoading(true)
    await axios.post("http://localhost:7000/updateOrder",
      {editabale,id},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth": localStorage.getItem('auth')
        }
      })
      .then(data => {
        setLoading(false)
        // alert('updated')
      })
      .catch(error => {
        setLoading(false)
        console.log(error);
      })
  }
  const deleteOrder = async (id) =>{
    await axios.delete(`http://localhost:7000/deleteOrder/${id}`,
    { 
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth": localStorage.getItem('auth')
      }
    }
    )

    .then(data => {
      alert('deleted order')
    })
    .catch(error => {
      console.log(error);
    })
  }
  useEffect(() => {
    getOrder()
  }, [loading])
  console.log(editabale.orderstatus);
  return (
    <Layout>
      {open
        ?
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: "center", alignItem: 'center' }}>
          <div style={{ width: '300px', height: 'auto', border: '1px solid #3333' }}>
            <select  value={editabale} onChange={(e)=>setEditabale(e.target.value)}>
              <option value="pending">pending</option>
              <option value="accepted">accepted</option>
              <option value="processing">processing</option>
              <option value="on the way">on the way</option>
              <option value="received">received</option>
              <option value="cancel">cancel</option>
            </select><br /><br />
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
                      <button onClick={() => openDetails(item.orderstatus,item.orderid)} style={{ width: '50px', height: '50px' }}>+</button>
                      <button onClick={()=>deleteOrder(item.orderid)} style={{ width: '50px', height: '50px' }}>-</button>
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