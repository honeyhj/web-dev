import axios from 'axios';
import React, { useEffect, useState } from 'react';
import URL from '../../User/Url';
import Layout from '../Layout';


const ProductManage = () => {
  const [product , setProduct]=useState([]);
  const [open , setOpen]=useState(false);
  const [editabale , setEditabale]=useState({});

  const [Images , setImages]=useState([]);
  const [title , setTitle]=useState('');
  const [skunumber , setSkunumber]=useState('');
const [description , setDescription]=useState('');
const [price , setPrice]=useState('');
const [quantity , setQuantity]=useState('');
const [weaight , setWeaight]=useState('');
const [category , setCategory]=useState('');
const [subcategory , setSubcategory]=useState('');
const [brand , setBrand]=useState('');
const [discount , setDiscount]=useState('');
const [stock , setStock]=useState('');
const [shippingdetails , setShippingdetails]=useState('');
const [manufacturesdetails , setManufacturesdetails]=useState('');
const [selectedsize , setSelectedsize]=useState([]);




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
  {Images,
    title,
    skunumber,
    description,
    price,
    quantity,
    weaight,
    category,
    subcategory,
    brand,
    discount,
    stock,
    shippingdetails,
    manufacturesdetails,
    selectedsize},
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
const updateProductData =()=>{
  console.log(editabale);
  
}
console.log(title);
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
            <button onClick={updateProductData}>update</button><br /><br />
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
                  <img src={`${URL}/${item.Images[0]}`} alt="" style={{width:'60px',height:'60px'}}/>
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