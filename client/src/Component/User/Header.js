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
        <div className="header-wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
          <div className="header-item1">
            <div className="logo">
              <Link to="/"><span>Anirban-It</span></Link>
            </div>
          </div>
          <div className="header-item2">
            {
              menus.map((item, index) => {
                if (item.Type === "simplemenu") {
                  return (
                    <li key={index} style={{ fontSize: '15px' }}>{item.CategoryName}</li>
                  )
                }
              })
            }
            {
              menus.map((item, index) => {
                if (item.Type === "dropdownmenuholder") {
                  return (
                    <li key={index} style={{ fontSize: '15px' }}>{item.CategoryName}</li>
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
                      style={{ fontSize: '15px' }}
                      onClick={() => handelOnClick(item.SubCategory)}
                    >{item.CategoryName}</li>
                  )
                }
              })
            }
          </div>
          <div className="header-item3" style={{ display: 'flex', justifyContent: 'space-around', fontSize: '15px' }}>
            <div>
              <Link to="/cartPage">
                <span className="cart">
                  <sup style={{ fontSize: '15px', textTransform: 'uppercase' }}>{props.cartLength}</sup><i className="fa fa-shopping-cart" style={{ color: 'oranged' }}></i></span>
              </Link>
            </div>
            <div>
              <Link to="/wishlistPage"><span className="cart"><sup style={{ fontSize: '15px', textTransform: 'uppercase' }}>{props.wishlistLength}</sup><i class="fa fa-heart"></i></span></Link>
            </div>
            <div className="extra_menus">
              <li style={{ fontSize: '15px', textTransform: 'uppercase' }}><i class="fa fa-user"></i>
                <ul styles={{border: '1px solid red'}}>
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
                return (<li key={index} style={{ fontSize: '15px', display: 'flex', justifyContent: "space-arround" }}>{item.Name}</li>)
              })
            }
          </div> : null
        }
      </div>

    </div>
  );
};

export default Header;