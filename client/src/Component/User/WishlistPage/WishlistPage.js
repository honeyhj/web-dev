import axios from 'axios';
import React, { useState } from 'react';

const WishlistPage = ({ products, wishlist,addToCart }) => {
  const [list , setList]=useState('');
  let wishproductlist = []

  for(let product of products ){
    for(let wishproduct of wishlist){
      if( product._id === wishproduct.productId){
        wishproductlist.push(product)
      }
    }
  }
  console.log(wishproductlist,'jhgklfdkj');
  
  const deleteWishList =async(id)=>{
    await axios.delete(`http://localhost:7000/deletewishlist/${id}`,
    {
      headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
      },
    }
    )
    .then(result=>{
      console.log(result);
      
    })
    .catch(error=>{
      console.log(error);
      
    })
  }
  const clearWIshList =async()=>{
    await axios.get("http://localhost:7000/clearwishlist",
    {
      headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
      },
    }
    )
    .then(result=>{
      console.log(result);
      
    })
    .catch(error=>{
      console.log(error);
      
    })
  }
  console.log(wishproductlist);
  
  return (
    <>
      {
        wishproductlist.map((item,index)=>{
          return(
            <div id="cart">
        <div className="img">
          <img src="" alt="pic" />
        </div>
        <div className="productName">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
        <div className="buttons-area">
          <div className="taka">
            <span>{item.price}</span>
          </div>
          
          <div className="delete">
            <button onClick={()=>addToCart(item._id,"add")}>add to cart</button><br /><br />
            <button onClick={()=>deleteWishList(item._id)}>delete</button>
          </div>
        </div>
      </div>
          )
        })
      }
      <button onClick={clearWIshList}>clear cart</button>
    </>
  );
};

export default WishlistPage;