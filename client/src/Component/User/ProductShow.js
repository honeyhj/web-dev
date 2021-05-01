import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';
import './productShow.css';
import man1 from './img/man1.jpg';
import axios from 'axios';
import URL from './Url';
import { set } from 'mongoose';
const ProductShow = ({ addToCart, addToWishlist, term }) => {
    const [products, setProducts] = useState([]);
    const [psize, setpSize] = useState();
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [loadMores, setLoadMores] = useState(false);
    const [loading, setLoading] = useState(false);

    const getAllProduct = async (variables) => {
        setLoadMores(true)
        await axios.post(`${URL}/get-products`,
            { variables }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .then(data => {
                if (data.data.success && loadMores) {
                    console.log('loadmore true')
                    console.log(data.data.postSize);
                    const update = products.concat(data.data.product)
                    setProducts(update)
                    setpSize(data.data.postSize)
                    setLoadMores(false)
                }
                else {
                    setProducts(data.data.product)
                    setpSize(data.data.postSize)
                    // console.log(data.data.product);
                    setLoadMores(false)
                }
                setLoading(false)
            })
    }
    useEffect(() => {
        const variables = { skip, limit }
        getAllProduct(variables)
    }, [])
    useEffect(() => {
        const variables = { skip, limit }
        getAllProduct(variables)
    }, [skip])
    const loadMore = () => {
        setLoadMores(true)
        setSkip(skip + 8)
        setLimit(8)
    }
    const getSearchProduct = async () => {
        await axios.get(`${URL}/getSearchProduct/${term}`).then(data => {
            console.log(data.data,'search data')
                setProducts(data.data.product)
                setLoadMores(false)
                setLoading(false)

        })
    }
    useEffect(async () => {
        await getSearchProduct();
    }, [term])
    return (
        <div className="product-container">
            <h2>Featured Product</h2>
            <div className="product-wrp">
                {loading ? <p>loading....</p> :
                    <>
                        {
                            products.map((item, index) => {
                                return (
                                    <div key={index} className="product-show" style={{ width: '250px', textAlign: 'center', border: '1px solid #3333', padding: '10px' }}>
                                        <div className="image" style={{ height: '200px' }}>
                                            <Link to={`/productDetails-Page/${item._id}`}>
                                                <img src={`${URL}/uploads/${item.Images[0]}`} alt="pic" style={{ width: '100%', height: '100%' }} />
                                            </Link>
                                        </div>
                                        <h3>{item.title}</h3>
                                        <div className="show-addCart">
                                            <button type="button" className="btn" onClick={() => addToCart(item._id, "add")} style={{ border: '1px solid #333', background: '#dddd', color: '#222', margin: '7px' }}>Add to cart</button>
                                            <button type="button" onClick={() => addToWishlist(item._id)} style={{ border: '1px solid #333', background: '#dddd', color: '#222', margin: '7px' }}>add to favourite</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>

                }
            </div>
            {
                psize >= 8 && (
                    <div className="load-more">
                        <button onClick={() => loadMore()}>Load More And</button>
                    </div>
                )
            }
        </div>
    );
}


export default ProductShow;
