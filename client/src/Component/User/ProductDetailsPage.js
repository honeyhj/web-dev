import React, { useEffect, useState } from 'react';
import './productShow.css';
import man1 from './img/man1.jpg';
import Header from './Header';
import { useParams } from 'react-router';
import axios from 'axios';
import URL from './Url';
const ProductDetailsPage = () => {
    const { id } = useParams()
    const [detailsProduct, setDetailsProduct] = useState({});
    const getDetails = async () => {
        
        await axios.get(`${URL}/getDetailsProduct/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .then(data => {
                setDetailsProduct(data)
            })
            .catch(error => {
                console.log(error,'jkfdskjfdsjkfdskjfsdkjfdskjhfdsjfdkjf');
            })
    }
    useEffect(() => {
        getDetails()
    }, [])
    console.log(detailsProduct);
    return (
        <>
            <Header></Header>
            <div id="productDetails">
                <div className="productDetails-wrapper">
                    <div className="productDetails-item1">
                        <img src={man1} alt="" />
                    </div>
                    <div className="productDetails-item2">
                        <div className="content">
                            <h3>{detailsProduct.title}</h3>
                            <div className="review"></div>
                            <div className="details">
                                <h4>title</h4>
                                <ul>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                </ul>
                            </div>
                            <div className="price">
                                <h5>current price: <span> 3550/-</span></h5>
                                <span>1 votes</span>
                            </div>
                            <div className="select-size">
                                <select name="" id="">
                                    <option>a</option>
                                </select>
                            </div>
                            <div className="add-to-addCart">
                                <button>Add to cart</button>
                                <button>Love</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="related-product">
                    <div className="img">
                        <div>
                            <img src={man1} alt="" />
                        </div>
                        <h5>Product Name</h5>
                    </div>
                    <div className="img"></div>
                    <div className="img"></div>
                    <div className="img"></div>
                    <div className="img"></div>
                    <div className="img"></div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailsPage;