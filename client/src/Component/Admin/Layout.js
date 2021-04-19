import React from 'react';
import { Link } from 'react-router-dom';

const Layout = (props) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', textTransform: 'uppercase', padding: '10px', background: '#dddd' }}>admin dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr', height: '100vh', padding: '10px' }}>
        <div style={{ borderRight: '3px solid #dddd' }}>
          <p style={{ fontSize: '20px', textTransform: 'capitalize', }}><Link to="/admindashboard/menumange">Menu Manage</Link></p>
          <p style={{ fontSize: '20px', textTransform: 'capitalize', }}><Link to="/admindashboard/ProductManage">Product Manage</Link></p>
          <p style={{ fontSize: '20px', textTransform: 'capitalize', }}><Link to="/admindashboard/uploadproduct">upload product</Link></p>
          <p style={{ fontSize: '20px', textTransform: 'capitalize', }}><Link to="/admindashboard/orderManage">Order Manage</Link></p>
          <p style={{ fontSize: '20px', textTransform: 'capitalize', }}><Link to="/admindashboard/userManage">User Manage</Link></p>
        </div>
        <div style={{ padding: '10px' }}>{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;