import axios from 'axios';
import React, { useEffect, useState } from 'react';
import URL from '../../User/Url';
import Layout from '../Layout';


const ProductManage = () => {
  const [product , setProduct]=useState([]);
  const [open , setOpen]=useState(false);
  const [editabale , setEditabale]=useState({});





  const getAllProduct = async () => {
    await axios.get(`${URL}/get-allproducts`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "auth": localStorage.getItem('auth')
        }
    })
        .then(data => {
          setProduct(data.data.product)
        })
        .catch(error=>{
          console.log(error);
          
        })
}
  const deleteProduct = async (id) => {
    await axios.get(`${URL}/delete-product/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    })
        .then(data => {
          setProduct(data.data.product)
        })
        .catch(error=>{
          console.log(error);
          
        })
}
const updateProduct = async(id) =>{
  await axios.post(`${URL}/update-product/${id}`,
  editabale,
  {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})
.then(data => {
  alert('updated')
})
.catch(error=>{
  console.log(error);
})
}
useEffect(() => {
    getAllProduct()
}, [])
console.log(product);
const openDetails = (item) =>{
  setEditabale(item)
  setOpen(true)
}
const editabaleData = (e) =>{
  const newEditiable = {...editabale}
  newEditiable[e.target.name]=e.target.value;
  setEditabale(newEditiable)
}

console.log(product);
  return (
    <Layout>
      
      <div>
        <ul>
        {open 
        ?
        <div style={{width:'100%',height:'100vh',display:'flex',justifyContent: "center",alignItem:'center'}}>
          <div style={{width:'300px',height:'auto',border:'1px solid #3333'}}>
            
            <input type="text" placeholder='title' name='title' value={editabale.title} onChange={editabaleData}/><br /><br />
            <input type="text" placeholder='skunumber' name='skunumber' value={editabale.skunumber} onChange={editabaleData}/><br /><br />
            <input type="text" placeholder='description' name='description' value={editabale.description} onChange={editabaleData}/><br /><br />
            <input type="text" placeholder='quantity' name='quantity' value={editabale.quantity} onChange={editabaleData}/><br /><br />
            <input type="text" placeholder='weaight' name='weaight' value={editabale.weaight} onChange={editabaleData}/><br /><br />
            <input type="text" placeholder='brand' name='brand' value={editabale.brand} onChange={editabaleData}/><br /><br />
            <input type="text" placeholder='discount' name='discount' value={editabale.discount} onChange={editabaleData}/><br /><br />
            <input type="text" placeholder='stock' name='stock' value={editabale.stock} onChange={editabaleData}/><br /><br />
            <button onClick={()=>updateProduct(editabale._id)}>update</button><br /><br />
            <button onClick={()=>setOpen(false)}>X</button>
          </div>
        </div>
        :
        <>
        {
          product.map((item, index)=>{
            return(
              <li key={index} style={{display:'grid',gridTemplateColumns:'3fr 1fr 2fr'}}>
                <div style={{display:'flex',justifyContent:'space-around'}}>
                  <img src={`${URL}/uploads/${item.Images[0]}`} alt="" style={{width:'60px',height:'60px'}}/>
                  <span style={{textAlign:'center'}}>{item.stock}</span>
                </div>
                <div>
                  <span style={{textAlign:'center'}}>{item.title}</span>
                  <span style={{textAlign:'center'}}>{item.price}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <button onClick={()=>openDetails(item)} style={{width:'50px',height:'50px'}}>+</button>
                  <button onClick={()=>deleteProduct(item._id)} style={{width:'50px',height:'50px'}}>-</button>
                </div>
              </li>
            )
          })
        }
        </>
      }
        </ul>
      </div>
    </Layout>
  );
};

export default ProductManage;