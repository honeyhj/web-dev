import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter, Router, Route, Link } from "react-router-dom";
import Home from './Home';
import ProductDetailsPage from './ProductDetailsPage';
import URL from './Url';
import './user.css';
import Userlogin from "./Userlogin";
import Userregister from "./Userregister";
import CartPage from "./CartPage.js/CartPage";
import Header from '../User/Header';
import CheckoutPage from './Pages/CheckoutPage';
import WishlistPage from './WishlistPage/WishlistPage';
import OrderPage from './Pages/OrderPage';
import InvoicePage from './Pages/InvoicePage';
const User = () => {
  const [cart, setCart] = useState([])
  const [cartLength, setCartLength] = useState([])
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLength, setWishlistLength] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const saveToCart = async (item, type) => {
    console.log(item, 'send id');
    setLoading(true)
    await axios.post(`http://localhost:7000/addToCart`,
      {
        type: type,
        product: item

      },
      {
        headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
        },
      }
    )
      .then(res => {
        console.log(res)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }
  const removeCart = async (id) => {
    setLoading(true)
    await axios.delete(`http://localhost:7000/deleteCart/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
        },
      }
    )
      .then(res => {
        setLoading(false)
        console.log(res)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }
  const clearCart = () => {
    setLoading(true)
    axios.get(`http://localhost:7000/clearCart`,
      {
        headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
        },
      }
    )
    .then(result=>{
      setLoading(false)
    })
    .catch(error=>{
      setLoading(false)
    })
  }
  const addToWishlist = async (id) => {
    setLoading(true)
    await axios.post(`http://localhost:7000/addToWishlist/${id}`,
      { name: 2 },
      {
        headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
        },
      }
    )
      .then(data => {
        setLoading(false)
        console.log(data);
      })
      .catch(error => {
        setLoading(false)
        console.log(error);
      })
  }

  const getAllProduct = async () => {
    await axios.get(`${URL}/get-allproducts`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
      .then(data => {
        setProducts(data.data.product)
      }
      )
      .catch(error => {
        console.log(error);

      })
  }
  const getCart = () => {
    axios.get("http://localhost:7000/getCart",
      {
        headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
        },
      }
    )
      .then(data => {
        setCart(data.data[0].cart)
        setCartLength(data.data[0].cart.length)
      })
      .catch(error => {
        console.log(error);
      })
  }
  const getWishlist = () => {
    axios.get("http://localhost:7000/getWishlist",
      {
        headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
        },
      }
    )
      .then(data => {
        setWishlist(data.data[0].wishlist)
        setWishlistLength(data.data[0].wishlist.length)
      })
      .catch(error => {
        console.log(error);
      })
  }
  useEffect(() => {
    getAllProduct()
    getCart()
    getWishlist()
  }, [loading])
  // console.log(products);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={props => <Home {...props} cartLength={cartLength} addToCart={saveToCart} wishlistLength={wishlistLength} addToWishlist={addToWishlist} />} />
        <Route exact path="/userregister" component={Userregister} />
        <Route exact path="/userlogin" component={Userlogin} />
        <Route exact path="/productDetails-Page/:id" component={ProductDetailsPage} />
        <Route exact path="/cartPage" render={props => <CartPage {...props} addToCart={saveToCart} cart={cart} deleteCart={removeCart} clearCart={clearCart} products={products} />} />
        <Route exact path="/checkoutPage" render={props => <CheckoutPage {...props} cart={cart} />} />
        <Route exact path="/wishlistPage" render={props => <WishlistPage {...props} products={products} wishlist={wishlist} addToCart={saveToCart} />} />
        <Route exact path="/orderPage" component={OrderPage} />
        <Route exact path="/invoicePage" component={InvoicePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default User;

// import React, { Component } from "react";
// import { Switch, BrowserRouter, Router, Route, Link } from "react-router-dom";
// import Userlogin from "./Userlogin";
// import Userregister from "./Userregister";
// import './user.css'
// export default class User extends Component {
//   constructor() {
//     super();
//     this.state = {
//       toggleMenuBar:false,
//     }
//   }
//   render() {
//     return (
//       <BrowserRouter>
//         <div className="row" style={{ justifyContent: "center" }}>
//           <div className="header">
//             <div className="header-wrapper">
//               <div className="header-item1">
//                 <div className="logo">
//                   hi
//                 </div>
//               </div>
//               <div className="header-item2">
//                 <li onClick={()=>this.setState(!this.toggleMenuBar)}>item1</li>
//                 <li onClick={()=>this.setState(!this.toggleMenuBar)}>item2</li>
//                 <li onClick={()=>this.setState(!this.toggleMenuBar)}>item3</li>
//                 <li onClick={()=>this.setState(!this.toggleMenuBar)}>item4</li>
//                 <li onClick={()=>this.setState(!this.toggleMenuBar)}>item5</li>
//               </div>
//               <div className="header-item3">
//                 bye
//               </div>
//             </div>
//             {
//               this.state.toggleMenuBar ? <div className="sub-header"></div> : null
//             }
//           </div>

//         </div>
//         <Switch>
//           <Route path="/userregister" component={Userregister} />
//           <Route path="/userlogin" component={Userlogin} />
//         </Switch>
//       </BrowserRouter>
//     );
//   }
// }
