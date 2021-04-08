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
const User = () => {
  const [cart,setCart] = useState([])
  const [cartLength,setCartLength] = useState([])

  const saveToCart = async (item,type) => {
    console.log(item,'send id');
    await axios.post(`http://localhost:7000/addToCart`,
    {
        type:type,
        product:item
        
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
        })
        .catch(err => {
            console.log(err)
        })
}
const removeCart =async(id)=>{
  console.log(localStorage.getItem('auth'),'locallllllll');
  
  await axios.post(`http://localhost:7000/deleteCart/${id}`,
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
        })
        .catch(err => {
            console.log(err)
        })
}
  useEffect(()=>{
    axios.get("http://localhost:7000/getCart",
    {
      headers: {
          Accept: "application/json",
          "Cotent-Type": "application/json",
          "auth": localStorage.getItem('auth')
      },
  }
    )
    .then(data=>{
      console.log(data,'datatata');
      setCart(data.data[0].cart)
      setCartLength(data.data[0].cart.length)
    })
    .catch(error=>{
      console.log(error);
    })
  },[])
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" render={props=> <Home {...props} cartLength={cartLength} addToCart={saveToCart}/>}/>
          <Route exact path="/userregister" component={Userregister} />
          <Route exact path="/userlogin" component={Userlogin} />
          <Route exact path="/productDetails-Page" component={ProductDetailsPage} />
          <Route exact path="/cartPage" render={props=> <CartPage {...props} addToCart={saveToCart} cart={cart} deleteCart={removeCart}/>} />
          <Route exact path="/checkoutPage" component={CheckoutPage} />
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
