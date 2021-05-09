import React, { useEffect, useState } from 'react';
import './productShow.css';
import man1 from './img/man1.jpg';
import Header from './Header';
import { useParams } from 'react-router';
import axios from 'axios';
import URL from './Url';
import ReactHtmlParser from 'react-html-parser';


const ProductDetailsPage = () => {
    const { id } = useParams()
    const [detailsProduct, setDetailsProduct] = useState([]);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false)
    const [getComment, setGetComment] = useState([])

    const getDetails = async () => {
        setLoading(true)
        await axios.get(`${URL}/getDetailsProduct/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .then(data => {
                setDetailsProduct(data.data)
                setLoading(false)
                console.log(data);
            })
            .catch(error => {
                console.log(error, 'kjk');
            })
    }

    const getComments = async () => {
        const { _id } = detailsProduct;
        await axios.get(`${URL}/getComment/${_id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "auth": localStorage.getItem('auth')
            }
        })
            .then(data => {
                setGetComment(data.data)
            })
            .catch(error => {
                console.log(error, 'kjk');
            })
    }
    useEffect(() => {
        getComments()
    }, [])
    const addComment = async (productId) => {
        await axios.post(`${URL}/addComment`, { productId, comment }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "auth": localStorage.getItem('auth')
            }
        })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error, 'kjk');
            })
        getComments()
    }
    useEffect(() => {
        getDetails()
    }, [])
    
    console.log(getComment);

    return (
        <>
            <Header></Header>
            {detailsProduct.length === 0 ? <p>loading........</p> :
                <div id="productDetails">
                    <div className="productDetails-wrapper">
                        <div className="productDetails-item1">
                            <img src={`${URL}/uploads/${detailsProduct.Images[0]}`} alt="pic" />
                        </div>
                        <div className="productDetails-item2">
                            <div className="content">
                                <h3>{detailsProduct.title}</h3>
                                <div className="review"></div>
                                <div className="details">
                                    <h4>{ReactHtmlParser(detailsProduct.description)}</h4>
                                </div>
                                <div className="price">
                                    <h5>current price: <span>{detailsProduct.price}</span></h5>
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
                    <div className="comment">
                        <label htmlFor="">review us</label>
                        <textarea name="" id="" cols="30" rows="05" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <button onClick={() => addComment(detailsProduct._id)}>comment</button>
                    </div>
                    <div className="comments">
                        {
                            getComment.map((item, index) => {
                                return (
                                    <p key={index}>{item.comment}</p>
                                )
                            })
                        }

                    </div>
                </div>
            }
        </>
    );
};

export default ProductDetailsPage;