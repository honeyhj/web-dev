import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MainSlider from './MainSlider';
import URL from './Url';
import './user.css'
const ShowCase = (props) => {
    const [box, setBox] = useState(false)
    const [menus, setMenus] = useState([])

    // s=0
    // e=50



    const priceBox = () => {

    }
    const getmenus = async () => {
        await axios.get(`${URL}/getmenus`)
            .then((data) => {
                setMenus(data.data)
            })
            .catch(error => {
                console.log(error);
            })
    };
    useEffect(() => {
        getmenus()
    }, [])


    // console.log(menus);

    return (
        <div id="showCase">
            <div className="showCase-wrapper">
                <div className="showCase-item1">
                    <div className="box">
                        <div className="sub-box">
                            <button type="button" className="price-btn" onClick={() => setBox(!box)}>Price Filter</button>
                            <input type="search" name="search" onChange={(e) => props.setSearchTerm(e.target.value)} placeholder="Enter search item" className="search-inp" />
                        </div>
                        {
                            box ?
                                <div className="dropBox">
                                    <div>
                                        <input type="radio" name="price" id="" onChange={() => props.setProductByRange(1, 5000)} style={{ margin: '0 10px' }} />
                                        <label>0-5k</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="price" onChange={() => props.setProductByRange(5001, 10000)} id="" style={{ margin: '0 10px' }} />
                                        <label>5k-10k</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="price" id="" onChange={() => props.setProductByRange(10001, 15000)} style={{ margin: '0 10px' }} />
                                        <label>15k-20k</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="price" id="" onChange={() => props.setProductByRange(15001, 20000)} style={{ margin: '0 10px' }} />
                                        <label>20k-30k</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="price" id="" onChange={() => props.setProductByRange(20001, 30000)} style={{ margin: '0 10px' }} />
                                        <label>20k-30k</label>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                    <div className="top-cat">
                        <h2>Top Categories</h2>
                        <div className="categories-item">
                            <ul>
                                {
                                    menus.map((item, index) => {
                                        if (item.topCategory) {
                                            return (
                                                <li key={index}>{item.CategoryName}</li>
                                            )
                                        }
                                    })
                                }
                                {/* <li>Lorem ipsum dolor sit amet.</li>
                                <li>Lorem ipsum dolor sit amet.</li>
                                <li>Lorem ipsum dolor sit amet.</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="showCase-item2">
                    <MainSlider></MainSlider>
                </div>
            </div>
        </div>
    );
};

export default ShowCase;