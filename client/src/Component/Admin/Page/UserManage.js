import axios from 'axios';
import React, { useEffect, useState } from 'react';
import URL from '../../User/Url';
import Layout from '../Layout';

const UserManage = () => {
  const [user, setUser] = useState([]);
  const getAllUser = () => {
    axios.get(`${URL}/getAllUser`)
      .then(result => {
        setUser(result.data)
      })
      .catch(error => {
        console.log(error);
      })
  }
  useEffect(() => {
    getAllUser()
  }, []);
  console.log(user);
  return (
    <Layout>
      <div>
        <ul>
          {
            user.map((item, index) => {
              return (
                <li key={index} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 2fr' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.fullname}</span>
                    <span>{item.email}</span>
                  </div>
                  <div>
                    <span style={{ textAlign: 'center' }}>{item.role}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick='' style={{ width: '50px', height: '50px' }}>+</button>
                    <button onClick='' style={{ width: '50px', height: '50px' }}>-</button>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </Layout>
  );
};

export default UserManage;