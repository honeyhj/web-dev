import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import URL from './Url';

const Header = (props) => {
  const [toggleMenuBar, setToggleMenuBar] = useState(false);
  const [menus, setMenus] = useState([]);
  const [subMenus, setSubMenus] = useState([]);
  const handelOnClick = (sub) => {
    setToggleMenuBar(!toggleMenuBar)
    setSubMenus(sub)
  }
  const getmenus = () => {
    axios.get(`${URL}/getmenus`).then((data) => {
      setMenus(data.data)
    });
  };
  useEffect(() => {
    getmenus()
  }, [])
  // console.log(props.cartLength);
  
  return (
    <div className="row" style={{ justifyContent: "center" }}>
      <div className="header">
        <div className="header-wrapper">
          <div className="header-item1">
            <div className="logo">
              <Link to="/"><span>BuyForest</span></Link>
            </div>
          </div>
          <div className="header-item2">
            {
              menus.map((item, index) => {
                if (item.Type === "simplemenu") {
                  return (
                    <li key={index}>{item.CategoryName}</li>
                  )
                }
              })
            }
            {
              menus.map((item, index) => {
                if (item.Type === "dropdownmenuholder") {
                  return (
                    <li key={index}>{item.CategoryName}</li>
                  )
                }
              })
            }
            {
              menus.map((item, index) => {
                if (item.Type === "megamenuholder") {
                  return (

                    <li
                      key={index}
                      onClick={() => handelOnClick(item.SubCategory)}
                    >{item.CategoryName}</li>


                  )
                }
              })
            }
          </div>
          <div className="header-item3" style={{'display':'flex','justifyContent':'space-around'}}>
            <Link to="/cartPage"><span className="cart"><sup>{props.cartLength}</sup>cart</span></Link><br />
            <Link to="/wishlistPage"><span className="cart"><sup>{props.wishlistLength}</sup>wish</span></Link>
            <div className="extra_menus">
                <li>user
                  <ul>
                    <li><Link to="/userregister">register</Link></li>
                    <li><Link to="/userlogin">login</Link></li>
                    <li><Link to="">logout</Link></li>
                    <li><Link to="/admindashboard/uploadproduct">dashboard</Link></li>
                  </ul>
                </li>
            </div>
          </div>
        </div>
        {
          toggleMenuBar ? <div className="sub-header">
            {
              subMenus.map((item, index) => {
                return (<li key={index}>{item.Name}</li>)
              })
            }
          </div> : null
        }
      </div>

    </div>
  );
};

export default Header;