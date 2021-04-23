import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './cart.css'
const CartPage = ({ cart, addToCart, deleteCart, clearCart, products }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [totalVat, setTotalVat] = useState();





  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [thana, setThana] = useState('');
  const [postal, setPostal] = useState('');
  const [road, setRoad] = useState('');

  const [orderid, setOrderid] = useState('');
  const [paymentid, setPaymentid] = useState('');
  const [total, setTotal] = useState('');
  const [dateofpurcashe, setDateofpurcashe] = useState('');
  const [orderstatus, setOrderstatus] = useState('');
  const [paymentmethod, setPaymentmethod] = useState('');
  const [checkout, setCheckout] = useState(false);


  const setOrder = async () => {
    const orderInfo = {
      orderid:Math.floor((Math.random() * 100) + 1),
      paymentid:'1232344',
      address:{
        name,
        thana,
        mobile,
        address,
        postal,
        road
      },
      products:product,
      total:totalPrice+totalVat,
      dateofpurcashe:Date.now(),
      orderstatus:'pending',
      paymentmethod: 'paypal',
    }
    await axios.post("http://localhost:7000/createOrder", orderInfo, {
      headers: {
        Accept: "application/json",
        "Cotent-Type": "application/json",
        "auth": localStorage.getItem('auth')
      },
    })
      .then(result => {
        console.log(result);

      })
      .catch(error => {
        console.log(error);

      })
  }
  
  const makePd = () => {
    const items = [];
    let total = 0;
    let vat = 0;
    cart.map(item => {
      products.map(pd => {
        console.log(pd, 'pdpdppdpdp');
        if (pd._id === item.productId) {
          items.push({ ...pd, item })
          total = total + pd.price * item.quantity;
          vat = vat + (pd.price * item.quantity) * 15 / 100;
          setTotalPrice(total)
          setTotalVat(vat)
        }
      }
      )
    }
    )
    setProduct(items)
  }

  useEffect(() => {
    makePd()
  }, [cart, loading])
  console.log(product);
  console.log(totalPrice);

  return (
    <>
      {
        checkout ?
        <>
          <button onClick={() => setCheckout(false)}>go back</button>
          <div>
            <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} /><br /><br />
            <input type="text" value={mobile} placeholder="mobile" onChange={(e) => setMobile(e.target.value)} /><br /><br />
            <input type="text" value={address} placeholder="address" onChange={(e) => setAddress(e.target.value)} /><br /><br />
            <input type="text" value={thana} placeholder="thana" onChange={(e) => setThana(e.target.value)} /><br /><br />
            <input type="text" value={postal} placeholder="postal" onChange={(e) => setPostal(e.target.value)} /><br /><br />
            <input type="text" value={road} placeholder="road" onChange={(e) => setRoad(e.target.value)} /><br /><br />
            {/* <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} /> */}
            <button onClick={setOrder}>paypa</button>
          </div>
        </>
      :
      <>
      {
        !cart.length && !checkout ? <p>cart is empty</p> :
          product.map((item, index) => {
            return (
              <div key={index} id="cart">
                <div className="img">
                  <img src={item.Images[0]} alt="pic" />
                </div>
                <div className="productName">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
                <div className="buttons-area">
                  <div className="taka">
                    <span>{item.price * item.item.quantity}</span>
                  </div>
                  <div className="quantity">
                    <button onClick={() => addToCart(item._id, "minus")}>-</button>
                    <span>{item.item.quantity}</span>
                    <button onClick={() => addToCart(item._id, "add")}>+</button>
                  </div>
                  <div className="delete">
                    <button onClick={() => deleteCart(item._id)}>delete</button>
                  </div>
                </div>
              </div>
            )
          })
      }
      
      <button onClick={clearCart}>clear cart</button>
      <span>total:{totalPrice}</span><br /><br />
      <span>vat:{totalVat}</span><br /><br />
      <span>total amount:{totalPrice + totalVat}</span>
      <br /><br /><br /><br /><br />
      <button onClick={()=>setCheckout(true)}>checkout</button>
      </>
    }
    </>
  );
};

export default CartPage;