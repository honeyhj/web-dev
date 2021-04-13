import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './cart.css'
const CartPage = ({cart,addToCart,deleteCart,products}) => {
  const [product , setProduct]=useState([]);

  const clearCart =()=>{
    axios.get(`http://localhost:7000/clearCart`,
    {
      headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
      },
    }
    )
  }
  const makePd =()=>{
    const items = [];
    // for(let pd of cart){
    //   console.log(pd,'hhhhh')
    // }
  cart.map(item=> {
    console.log(item,'hhhhh')
    
    products.map(pd=>{
      if(pd._id === item.productId){
        // console.log(item.productId,'oppopopoo');
        
        items.push(pd)
      }
    }
    )
  }
  )
  
  setProduct(items)
  }
  useEffect(()=>{
    makePd()
  },[cart])
  return (
    <>
      {
        cart.map((item,index)=>{
          return(
            <div key={index} id="cart">
        <div className="img">
          <img src="" alt="pic" />
        </div>
        <div className="productName">
          <h2>item.title</h2>
          <p>item.description</p>
        </div>
        <div className="buttons-area">
          <div className="taka">
            <span>item.price</span>
          </div>
          <div className="quantity">
            <button onClick={()=>addToCart(item.productId,"minus")}>-</button>
            <span>{item.quantity}</span>
            <button onClick={()=>addToCart(item.productId,"add")}>+</button>
          </div>
          <div className="delete">
            <button onClick={()=>deleteCart(item.productId)}>delete</button>
            <span>kk</span>
          </div>
        </div>
      </div>
          )
        })
      }
      <span>total:</span>
      <button onClick={clearCart}>clear cart</button>
      <br /><br /><br /><br /><br />
      <Link to="/checkoutPage"><button>checkout</button></Link>
    </>
  );
};

export default CartPage;