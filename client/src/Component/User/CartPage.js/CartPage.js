import React from 'react';
import { Link } from 'react-router-dom';
import './cart.css'
const CartPage = ({cart,addToCart,deleteCart,clearCart}) => {
  return (
    <>
      {
        cart.map((item,index)=>{
          return(
            <div id="cart">
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
          </div>
        </div>
      </div>
          )
        })
      }
      <button onClick={clearCart}>clear cart</button>
      <br /><br /><br /><br /><br />
      <Link to="/checkoutPage"><button>checkout</button></Link>
    </>
  );
};

export default CartPage;