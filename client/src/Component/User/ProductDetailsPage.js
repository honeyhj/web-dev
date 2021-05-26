import React, { useEffect, useState } from 'react';
import './productShow.css';
import man1 from './img/man1.jpg';
import Header from './Header';
import { useParams } from 'react-router';
import axios from 'axios';
import URL from './Url';
import ReactHtmlParser from 'react-html-parser';
import ReactStars from "react-rating-stars-component";
import ImageGallery from 'react-image-gallery';

const ProductDetailsPage = () => {
    const { id } = useParams()
    const [detailsProduct, setDetailsProduct] = useState([]);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false)
    const [getComment, setGetComment] = useState([])
    const [rating, setRating] = useState('');
    const [Images, setImages] = useState([]);


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
                if (data.data.Images.length > 0) {
                    let images = [];
                    data.data.Images.map(item => {
                        images.push({
                            original: `${URL}/uploads/${item}`,
                            thumbnail: `${URL}/uploads/${item}`
                        })
                    })
                    setImages(images)
                }
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
    const addComment = async (productId) => {
        await axios.post(`${URL}/addComment`, { productId, comment, rating }, {
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
                console.log(error, 'kjcvgcfk');
            })
    }
    useEffect(() => {
        getDetails()
        getComments()
    }, [])
    const ratingCount = (val) => {
        setRating(val)
    }
    console.log(getComment);
    return (
        <>
            <Header></Header>
            {detailsProduct.length === 0 ? <p>loading........</p> :
                <div id="productDetails">
                    <div className="productDetails-wrapper">
                        <div className="productDetails-item1" style={{ borderRadius: '3px' }}>
                            {/* <img src={`${URL}/uploads/${detailsProduct.Images[0]}`} alt="pic" style={{ borderRadius: '3px' }} /> */}
                            <ImageGallery items={Images}></ImageGallery>
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
                                    <ReactStars
                                        isHalf
                                        count={5}
                                        edit={false}
                                        size={24}
                                        activeColor="#ffd700"
                                        color="red"
                                    />,
                                </div>
                                {/* <div className="select-size" style={{ border: '1px solid #3333', padding: '10px', borderRadius: '3px' }}>
                                    <label htmlFor="" style={{ margin: '10px 0', fontSize: '20px' }}>choose size</label><br />
                                    <select name="" id="" style={{ border: '1px solid #3333' }}>
                                        <option>a</option>
                                    </select>
                                </div> */}
                                <div className="add-to-addCart">
                                    <button style={{ borderRadius: '3px' }}>Add to cart</button>
                                    <button style={{ borderRadius: '3px' }}>Love</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <>
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
                                        <h4>{item.price}</h4>
                                        <div className="show-addCart">
                                            <button type="button" className="btn" onClick={() => addToCart(item._id, "add")} style={{ border: '1px solid #333', background: '#dddd', color: '#222', margin: '7px' }}>Add to cart</button>
                                            <button type="button" onClick={() => addToWishlist(item._id)} style={{ border: '1px solid #333', background: '#dddd', color: '#222', margin: '7px' }}>add to favourite</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </> */}
                    <div className="comment" style={{ marginTop: '20px' }}>
                        <label htmlFor="" style={{ margin: '0 10px', fontSize: '20px' }}>Review Us..</label><br />
                        <ReactStars
                            value={rating}
                            count={5}
                            onChange={ratingCount}
                            size={24}
                            activeColor="#ffd700"
                        />,
                        <textarea name="" id="" cols="30" rows="05" value={comment} onChange={(e) => setComment(e.target.value)} style={{ border: '1px solid #3333', background: '#dddd', color: '#222', margin: '7px 0', borderRadius: '3px' }}></textarea><br />
                        <button onClick={() => addComment(detailsProduct._id)} style={{ outline: 'none', background: '#333', color: '#ffff' }}>comment</button>
                    </div>
                    <div className="comments" style={{paddingLeft:'10px'}}>
                        {
                            getComment.map((item, index) => {
                                return (
                                    <div>
                                        <div style={{ borderLeft: '3px solid #333',paddingRight:"7px",width:"300px",margin:"5px"}}>
                                            <ReactStars
                                                value={item.rating}
                                                count={5}
                                                edit={false}
                                                size={24}
                                                activeColor="#ffd700"
                                            />,
                                            <p style={{color: '#3333', padding: '0px 7px' }}>By:{item.userId.fullname}</p>
                                            <p key={index} style={{ fontSize: '15px', padding: '0px 7px',listStyle:'none' }}>{item.comment}</p>
                                        </div>
                                    </div>
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